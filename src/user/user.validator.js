import Joi from 'joi';
import joi from 'joi';


export const signupSchema = joi.object({
  firstName: joi.string()
    .min(4)
    .required()
    .messages({
      'string.min': 'First name must be at least 5 characters long',
      'any.required': 'First name is required'
    }),
  
  lastName: joi.string()
    .min(4)
    .required()
    .messages({
      'string.min': 'Last name must be at least 4 characters long',
      'any.required': 'Last name is required'
    }),
  
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: joi.string()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\W_]).{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain an uppercase letter, a lowercase letter, a special character, and be at least 8 characters long',
      'any.required': 'Password is required'
    }),
    phonenumber: Joi.string().required().length(11).pattern(new RegExp('^(?=.*[0-9])'))

});

export const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})
