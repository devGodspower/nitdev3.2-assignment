import { createAccount } from "./account.service.js";
import { createAccountSchema } from "./account.validator.js";
import { getAccountNumber } from "./account.service.js";

export const createAccounts = async (req, res) => {
  

  try {
    const user = req.user;
    console.log(user);

    if (!user) {
      return res.status(401).json({
        message: "You must be logged in to create an account",
      });
    }

    const { error, value } = createAccountSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    
    const generateaccountNumber = () => {

        const prefix = 202;
       
      const random = Math.floor(1000000 + Math.random() * 9000000).toString(); 
      const randomNumber = prefix + random;
      return  randomNumber
    };
let accountnumber = generateTenDigitNumber();


let existingaccount = await getAccountNumber(accountnumber);
        if(existingaccount.length >0){
          accountnumber = generateaccountNumber();
          existingaccount = await  getAccountNumber(accountnumber)

        }

    
    const account = await createAccount(user.userid, accountnumber, value.currency, value.type);

    if (!account) { 
      return res.status(500).json({
        message: "Failed to create account.",
      });
    }

    console.log(account);

    return res.status(201).json({
      message: "User account created",
      account: account,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
