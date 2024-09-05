import { executeQuery } from "../config/database.js";



export const createUser = async (username, email, password) => {
  try {
    const query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`
    const result = await executeQuery(query, [username, email, password]);

    console.log(result, query)

    return result
  } catch (error) {
    console.error("error inserting into users!!", error);
    
  }
}