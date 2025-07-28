import Joi from 'joi';

export const supplierSchema=Joi.object({
    name:Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
     "string.empty":"Suppliers name is required",
     "string.min":"Suppliers name should have atleast 3 character",
     "string.max":"suppliers name should not exceed 100 characters",
     "any.required":"suppliers name is required"
    }),

 contact: Joi.string()
        .min(10)
        .max(100)
        .pattern(/^[0-9+\-\s]+$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.min": "Phone number should have at least 10 digits",
            "string.max": "Phone number should not exceed 100 characters",
            "string.pattern.base": "Phone number can contain only digits, spaces, + or -",
            "any.required": "Phone number is required"
        }),
    email: Joi.string()
        .email()
        .max(100)
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email",
            "string.max": "Email should not exceed 100 characters",
            "any.required": "Email is required"
        }),
    upi: Joi.string()
        .max(100)
        .messages({
            "string.max": "UPI should not exceed 100 characters"
        })
});

