import { executeQuery } from "../config/database.js";


export const createUserTables = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR (100) NOT NULL,
        lastName VARCHAR (100) NOT NULL,
        email VARCHAR(100) UNIQUE,
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


