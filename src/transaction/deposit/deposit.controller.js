import { makedeposit,depositDetailes} from "./deposit.service.js";  
import { depositSchema } from "./deposit.validator.js";  
import { getAccountNumber} from "../../account/account.service.js"; 


export const deposit = async (req, res) => {
    try {
        const user = req.users;

        
        const { error,value } = depositSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const {depositorId,receiver_accountnumber,amount} = value


        
        const [updatedAccount] = await getAccountNumber(receiver_accountnumber)
        console.log(updatedAccount)

        if (!updatedAccount) return  res.status(404).json({
            
            message: " Account Not Found"
         })


            await makedeposit (depositorId,receiver_accountnumber,amount)
            const detailes = await depositDetailes(depositorId,receiver_accountnumber,amount)



        
        return res.status(200).json({
            message: "Deposit successful",
            updatedAccount,
        });

    } catch (error) {
        console.error("Error processing deposit:", error);
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

