
import Joi from "joi";



export const transferSchema = Joi.object({

    sender_accountnumber : Joi.string().required(),
    receiver_accountnumber: Joi.string().required(),
    amount:  Joi.number().min(0).required()
    
})
