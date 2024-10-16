import { executeQuery } from "../config/database.js";


export const createUserTables = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        userId UUID PRIMARY KEY,
        firstName VARCHAR (100) NOT NULL,
        lastName VARCHAR (100) NOT NULL,
        email VARCHAR(100) UNIQUE,
        phonenumber VARCHAR (11) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    try {
        await executeQuery(query);
        console.log("users table created");
    } catch (error) {
        console.error("Error creating users table", error);
    }
}


