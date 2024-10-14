
import { executeQuery } from "../../config/database.js";


export const transferTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS transfers (
        transfer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        sender_accountNumber VARCHAR(10) NOT NULL,
        receiver_accountNumber VARCHAR(10) NOT NULL,
        amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK(amount >=0),
        transferDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY  (sender_accountNumber) REFERENCES accounts(accountNumber) ON DELETE CASCADE,
        FOREIGN KEY (receiver_accountNumber) REFERENCES accounts(accountNumber) ON DELETE CASCADE

        
    )`;

    try {
        await executeQuery(query);
        console.log("Transfers table created");
    } catch (error) {
        console.log("Error creating transfers table", error);
    }
};

