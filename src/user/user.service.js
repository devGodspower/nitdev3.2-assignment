import { executeQuery } from "../config/database.js";
import {v4 as uuidv4} from 'uuid'





export const createUser = async (firstName,lastName, email, password,phonenumber) => {
        try {
          const userId = uuidv4()
          const query = `INSERT INTO users (userId,firstName,lastName, email, password,phonenumber,created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`
          const result = await executeQuery(query, [userId,firstName,lastName, email, password,phonenumber]);

          return result;

          
        } catch (error) {
          console.error("error inserting into users!!", error);
          
        }
      }
      export const getUserByEmail = async(email) =>{
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
    
            const res = await executeQuery(query, [email]);
    
            return res
        } catch (error) {
            
        }
    }
    export const getUserByPhoneNumber = async(phonenumber) =>{
      try {
          const query = `SELECT * FROM users WHERE phonenumber = $1;`
  
          const res = await executeQuery(query, [phonenumber]);
      
          return res
          
      } catch (error) {
          throw new Error(error)
      }
  }

      export const getuserbyid = async (id) => {
        try {
          const query = `SELECT * FROM users WHERE userId = $1;`;
          const result = await executeQuery(query, [id]);
          return result
        } catch (error) {
          console.log('Error fetching user by ID:', error);
           
        }
      };
      

export const getallusers = async () => {
          try {
            
            const query =`SELECT * FROM users ORDER By userId ASC ;`
            const res = await executeQuery(query);
            return res
            } 
            catch (error) {
            console.error('Error fetching users:', error);
          
        }}
export const deleteByid= async (id) => {
        try {
        
          

          
          const query =`DELETE FROM users WHERE userid = $1 RETURNING *;`;
          
          
          const res = await executeQuery(query, [id]);
          
        return res;
          
        }

        
      catch (error) {
          console.error('Error deleting user:', error);
          
        
}}

export const update =async () =>{
  const query =`
               SELECT COUNT (*)
               WHERE firstName IS NULL;
                

                ;
`;
try {
  await executeQuery(query);
  console.log(" data type updated");
} catch (error) {
  console.error("Error updating data type", error);
  }
}

export const addcolumns =async () =>{
  const query =`ALTER TABLE
              users
           ADD COLUMN firstName VARCHAR (50) NOT NULL;
            
`;
try {
  await executeQuery(query);
  console.log("users table columns added");
} catch (error) {
  console.error("Error creating  new columns", err);
}
}
export const deletecolumn =async () =>{
  const query =`ALTER TABLE 
                  users
               
               DROP COLUMN username ;
`;
try {
  await executeQuery(query);
  console.log(" column deleted");
} catch (error) {
  console.error("Error deleting column", err);
  }
}



