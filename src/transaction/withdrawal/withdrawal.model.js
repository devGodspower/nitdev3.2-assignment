import { executeQuery } from "../../config/database.js";


export const createwithdrawalTable = async()=>{
  const query = `CREATE TABLE IF NOT EXISTS withdrawals(
  withdrawId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accountNumber  VARCHAR (10) NOT NULL,
  FOREIGN KEY (accountNumber) REFERENCES accounts(accountNumber),
  amount  DECIMAL (10,2) DEFAULT 0.00 NOT NULL CHECK(amount >=0),
  withdrawalTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  
  )`;
try {
  await executeQuery(query);
  console.log("withdawal Table created successful")
}catch (err){
  console.log("error creating withdrawal Table")
}
}