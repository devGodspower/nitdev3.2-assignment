import { executeQuery } from "../config/database.js";
import {v4 as uuidv4} from 'uuid';

export const createAccount = async (userId, accountNumber, currency, type) =>{
    try{
      const accountId = uuidv4()
    const query = `INSERT INTO accounts (accountid, userid, accountnumber, currency, type) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `

    const results = await executeQuery(query, [accountId,userId,accountNumber, currency, type])

    return results
    }catch(error){
        throw new Error(error)
    }
}


export const getAccountNumber = async(accountnumber) =>{
    try {
        const query = `SELECT * FROM accounts where accountnumber = $1`
        const results = await executeQuery(query, [accountnumber])

        return results
    } catch (error) {
        throw new Error(error);
    }
}
export const getAccountId = async(accountId) =>{
    try {
        const query = `SELECT * FROM accounts where accountId = $1`
        const results = await executeQuery(query, [accountId])

        return results
    } catch (error) {
        throw new Error(error);
    }
}