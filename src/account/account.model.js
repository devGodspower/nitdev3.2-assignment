import { executeQuery} from "../config/database.js";

export const createAccountTable = async ()  => {
  const query = `
  CREATE TABLE IF NOT EXISTS accounts(
  accountId UUID primary key,
  userId UUID,
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
  accountNumber VARCHAR(10) UNIQUE  NOT NULL,
  currency VARCHAR (3) CHECK (currency in ('USD', 'NGN')),
  Balance NUMERIC (10,2) DEFAULT 0.00 NOT NULL CHECK (Balance >= 0),
  type VARCHAR (10) CHECK (type in ('savings','current')),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  try{
    await executeQuery (query);
    console.log("account table created");


  } catch (err) {
    console.log("Error creating account table")

  }
  }
  
