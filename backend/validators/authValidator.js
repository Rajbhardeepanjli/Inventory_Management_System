import Joi from 'joi';

export const signupSchema=Joi.object({
    username:Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
        "string.empty":"username is required",
        "string.min":"Username should have atleast 3 character",
        "any.required":"Username is required"
    }),
    email:Joi.string()
    .email()
    .required()
    .messages({
        "string.empty":"Email is Required" ,
        "string.email":"Please enter a valid email",
        "any.required":"Email is required"
    }),
    password:Joi.string()
    .min(6)
    .required()
    .messages({
        "string.min":"Password must be atleast 6 character long",
        "string.empty":"Password is required",
        "any.required":"Password is required"
    })
})

export const loginSchema=Joi.object({
    email:Joi.string()
    .email()
    .required()
    .messages({
        "string.empty":"Email is Required" ,
        "string.email":"Please enter a valid email",
        "any.required":"Email is required"
    }),
    password:Joi.string()
    .min(6)
    .required()
    .messages({
        "string.min":"Password must be atleast 6 character long",
        "string.empty":"Password is required",
        "any.required":"Password is required"
    })
})