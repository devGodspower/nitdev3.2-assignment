
import { executeQuery } from "../../config/database.js";


export const  makeTransfer = async (sender_accountnumber,  receiver_accountnumber, amount) => {

    try {
        
        await executeQuery('BEGIN')

        const senderAccount = await executeQuery('select * from accounts where accountNumber = $1', [sender_accountnumber])

        if (senderAccount.length <= 0){
            throw new Error('Sender account does not exist. ')
        }

        if (parseFloat(senderAccount[0]. balance) < amount){
            throw new Error('Insufficient funds!!')
        }

        const recieverAccount = await executeQuery('select * from accounts where accountNumber = $1', [receiver_accountnumber])

        if (recieverAccount.length <= 0){
            throw new Error('Reciever account does not exist. ')
        }

        await executeQuery('update accounts set balance = balance - $1 where accountNumber = $2', [amount, sender_accountnumber])

        await executeQuery('update accounts set balance = balance + $1 where accountNumber = $2', [amount,receiver_accountnumber])

        await  executeQuery('COMMIT');

        return senderAccount
        

    

    } catch (error) {

        await executeQuery('rollback')
        console.error('Transfer failed, transaction rolled back')
        throw new Error(error)
    }

}

export const transfer_detailes  = async (sender_accountnumber,receiver_accountnumber,amount)=>{
  try {
    
    const query =   `INSERT INTO transfers ( sender_accountNumber, receiver_accountNumber, amount) VALUES($1,$2,$3 ) RETURNING *`

    const result = await executeQuery(query,[sender_accountnumber,receiver_accountnumber,amount]);
    return result;

  


  } catch (error){
    console.log ("error inserting into tranfer table");
  }


}
