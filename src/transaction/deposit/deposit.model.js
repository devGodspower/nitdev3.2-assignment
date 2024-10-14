import { executeQuery } from "../../config/database.js";


export const depositTable = async() => {
  const query = `CREATE TABLE IF NOT EXISTS deposit(
  depositId UUID PRIMARY KEY DEFAULT gen_random_uuid() ,
  accountNumber VARCHAR(10)NOT NULL,
  userId uuid ,
  FOREIGN KEY (accountNumber) REFERENCES accounts(accountNumber) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
  amount DECIMAL (15,2) DEFAULT 0.00 NOT NULL CHECK(amount >=0),
  depositTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
try{
  await executeQuery(query);
  console.log("deposit Tabel created")
}
catch (err){
  console.log("error creating deposit Table")

}

}