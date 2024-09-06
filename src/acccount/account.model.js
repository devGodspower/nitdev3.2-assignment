import { executeQuery} from "../config/database.js";

export const createAccountTable = async ()  => {
  const query = `
  CREATE TABLE IF NOT EXISTS accounts(
  id SERIAL primary key ,
  user_id SERIAL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  accountNumber VARCHAR(10) UNIQUE  NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  try{
    await executeQuery (query);
    console.log("account table created");


  } catch (err) {
    console.log("Error creating account table")

  }
  }
  
