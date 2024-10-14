
import Joi from "joi";



export const withdrawalSchema = Joi.object({

    AccountNumber: Joi.string().required(),
    amount:Joi.number().min(0).required()
    
})
