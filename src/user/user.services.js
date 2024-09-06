import { executeQuery } from "../config/database.js";



export const createUser = async (firstName,lastName, email, password) => {
        try {
          const query = `INSERT INTO users (firstName,lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *`
          const result = await executeQuery(query, [firstName,lastName, email, password]);

          console.log(result, query)

          return result
        } catch (error) {
          console.error("error inserting into users!!", err);
          
        }
      }

      export const getuserbyid = async (id) => {
        try {
          const query = `SELECT * FROM users WHERE id = $1;`;
          const result = await executeQuery(query, [id]);
          return result
        } catch (err) {
          console.error('Error fetching user by ID:', err);
          throw err; 
        }
      };
      

export const getallusers = async () => {
          try {
            
            const query =`SELECT * FROM users ;`
            const res = await executeQuery(query);
            return res
            } 
            catch (err) {
            console.error('Error fetching users:', err);
          
        }}
export const deleteByid= async (id) => {
        try {
        
          

          
          const query =`DELETE FROM users WHERE id = $1;`;
          
          
          const res = await executeQuery(query, [id]);}

        
      catch (err) {
          console.error('Error deleting user:', err);
        
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
  console.error("Error updating data type", err);
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



