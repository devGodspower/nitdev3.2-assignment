import { withdraw,updatewithdrawal } from "./withdrawal.service.js";
import { withdrawalSchema } from "./withdrawal.validator.js";
import { getAccountNumber } from "../../account/account.service.js";

export const withdrawal = async (req, res) => {

  try {
      
      const user = req.user;
      
    

      const { error, value } = withdrawalSchema.validate(req.body);

      if (error) {
          return res.status(400).json({ message: error.details[0].message })
      }
      

      const { AccountNumber, amount } = value;


      const [acct] = await getAccountNumber(AccountNumber);


      if (acct.id !== user.userId) {
          return res.status(403).json({ message: "You are not the owner of this account"})
      }

       await withdraw(AccountNumber, amount)

      const [withdrawal] = await updatewithdrawal(AccountNumber, amount);


      return res.status(200).json({
          message: 'Withdrawal successful',
          withdrawal
      })
  } catch (error) {

      console.error(error.message)
      return res.status(500).json({ message: `Internal server Error, ${error}`})
      
  }
};