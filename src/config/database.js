import pkg from 'pg'
import { config } from "./env.js"

const { Pool } = pkg;

const pool = new Pool({
    max: 200,
    host: config.db.host,
    user: config.db.user,
    database: config.db.name,
    password: config.db.password,
    port: config.db.port
});


export const executeQuery = async(query, values = []) => {
    let client;
    
    try{
         client = await pool.connect();
        const result = await client.query(query,values);
        return result.rows 
        

        }catch (error){
            console.error("error executing query",error.message);
    }finally {
        if (client){
            client.release();
        }
    }
            }
            
// export const executeQuery = (query, values = []) => {
//     return new Promise((resolve, reject) => {
//         pool.connect((err, client , done ) => {
//             if (err) {
//                 console.error("error creating database connection", err);
//                 return reject(err);
//             }
//             client.query(query, values, (err, results) => {
//                 done();
//                 if(err){
//                     console.error("error executing query",err);
//                     return reject(err);
//                 }
//                 return resolve(results.rows)
//             })
//         })
//     })
// }
            