const Joi = require("joi");

const emailOption = {
    allowUnicode:true,
    ignoreLength:false,
    minDomainSegments:2,
    maxDomainSegments:2,
    multiple:false,
    tlds:true,
}

const AuthSchema = Joi.object({
    email:Joi.string()
             .trim()
             .lowercase()
             .email(emailOption)
             .pattern(/^[a-z0-9_.@-]{1,}$/)
             .required(),
    password:Joi.string()
                .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/:+-.]).{1,}$/)
                .min(8)
                .max(128)
                .disallow(Joi.ref('email'))
                .required()

});

module.exports = AuthSchema;



