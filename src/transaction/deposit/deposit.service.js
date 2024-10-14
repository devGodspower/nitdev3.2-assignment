
import { executeQuery } from "../../config/database.js";



export const  makedeposit = async ( depositorId,receiver_accountnumber, amount) => {

    try {
        
        await executeQuery('BEGIN')
        const sender = await executeQuery(`SELECT * FROM users WHERE userId = $1`, [depositorId])

        if (sender.lenght <= 0) {
            throw new Error(`You are not a valid depositor`)
        }

       

        const receiverAccountNumber = await executeQuery('select * from accounts where accountNumber = $1', [receiver_accountnumber])

        if (receiverAccountNumber.length <= 0){
            throw new Error('receiver account does not exist. ')
        }



        await executeQuery('update accounts set balance = balance + $1 where accountNumber = $2', [amount, receiver_accountnumber])

        await  executeQuery('COMMIT');

        return receiverAccountNumber

        //console.log('deposit successful')

    } catch (error) {

        await executeQuery('rollback')
        console.error('deposit failed, transaction rolled back')
        throw new Error(error)
    }

}
export const depositDetailes = async (depositorId,receiver_accountnumber,amount) => {
    try{
    
      const query =`INSERT INTO deposit  (userId, accountNumber, amount) VALUES($1,$2,$3) RETURNING *`
      const result = await executeQuery(query,[depositorId,receiver_accountnumber,amount])
      return result;
  
    }catch (error){
      console.log("eror inserting into depositTable")
    }
  }
