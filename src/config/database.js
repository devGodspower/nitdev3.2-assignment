import pkg from 'pg'
import { config } from "./env.js"

const { Pool } = pkg;

const pool = new Pool({
    max: 100,
    host: config.db.host,
    user: config.db.user,
    database: config.db.name,
    password: config.db.password,
    port: config.db.port
});


export const executeQuery = async(query, values = []) => {

    const client = await pool.connect();
    try{
        const result = await client.query(query,values);
        return result.rows 
        

        }catch (error){
            console.error ("error executing query",error);
        }
                console.error("Error creating database connection", err);
                return reject(err);
            }

            