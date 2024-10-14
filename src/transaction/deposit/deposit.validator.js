import Joi from 'joi';

export const depositSchema = Joi.object({
    depositorId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    receiver_accountnumber : Joi.string().required()
});
