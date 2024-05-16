const Joi = require("joi");

exports.signUpSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pro"] } })
        .required(),
    password: Joi.string()
        .pattern(/^[A-Z][a-z0-9]{3,8}$/)
        .required(),
    CPassword: Joi.ref("password"),
    role: Joi.string(),
    isVerfied: Joi.boolean().default(false),
    address: Joi.object({
        city: Joi.string().alphanum().min(3).max(30),
        country: Joi.string().alphanum().min(3).max(30),
    }),


});
exports.signinSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pro"] } })
        .required(),
    password: Joi.string()
        .pattern(/^[A-Z][a-z0-9]{3,8}$/)
        .required(),
});

