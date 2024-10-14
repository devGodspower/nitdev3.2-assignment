import { executeQuery } from "../../config/database.js";


export const withdraw = async (AccountNumber, amount) => {

    try {
        
        await executeQuery('BEGIN')

        const account = await executeQuery(`select * from accounts where accountNumber = $1`, [AccountNumber])
        console.log(account)

       // if (account.length <= 0) throw new Error('account is not valid')

        if (parseFloat(account[0].balance) < amount){
            throw new Error('Insufficient funds!')
        }

        await executeQuery('update accounts set Balance = Balance - $1 where accountNumber = $2', [amount, AccountNumber])


        await  executeQuery('COMMIT');
        return account;

        

    } catch (error) {
        
        await executeQuery('rollback')
        console.error('Withdrawal failed, transaction rolled back');
        throw new Error(error)
    }
};


export const updatewithdrawal= async (AccountNumber, amount) => {
    try {
        
        const query = `INSERT INTO withdrawals (accountNumber, amount) VALUES ($1, $2) RETURNING *`;
        const result = await executeQuery(query, [AccountNumber, amount]);
        return result;
    } catch (error) {
        throw new Error(error)
    }
};