import { makeTransfer } from "./transfer.service.js";
import { transferSchema } from "./transfer.validator.js";
import { getAccountNumber } from "../../account/account.service.js";
import { transfer_detailes } from "./transfer.service.js";





export const  transfer = async (req, res) => {

    try {
        
        const user = req.user;
        

        const  { error, value} = transferSchema.validate(req.body)

        if  (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const { sender_accountnumber, receiver_accountnumber, amount} = value;
        

        const [acct] = await getAccountNumber(sender_accountnumber)

        if (acct.id !== user.userId){
            return res.status(403).json({ message: "You are not the owner of this account you thief"})
        }
        if(sender_accountnumber === receiver_accountnumber){
            return res.status(400).json({ message: "You can't transfer to your own account" })
        }

        const senderAcc = await makeTransfer(sender_accountnumber, receiver_accountnumber, amount);

        const detailes = await transfer_detailes({sender_accountnumber, receiver_accountnumber, amount})
        
        
        
        
        

        return res.status(200).json({
            message: "transfer successful",
            detailes,
            senderAcc


            
        
        })

        


    } catch (error) {

        console.error(error)
        return res.status(500).json({ message: `Internal Server Error, ${error}` });
        
    }
}