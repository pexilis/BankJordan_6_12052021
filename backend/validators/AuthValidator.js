const Joi = require("joi");

const emailOption = {
    allowUnicode:true,
    ignoreLength:false,
    minDomainSegments:2,
    maxDomainSegments:2,
    multiple:false,
    tlds:true,
}

const messageSubs = {
    regexEmailAllow:"contient des caractères interdites",
    regexEmail:"doit être valide",
    regexPassword:"doit avoir au moins 1 minuscule, 1 majuscule, 1 caractère spécial, 1 chiffre",
    string:"doit être une chaîne de caractères",
    empty:"ne doit pas être vide",
    min:"doit avoir au moins {#limit} caractères",
    max:"ne peut pas avoir plus de {#limit} caractères",
    required:"doit être présent"
}

const generateMessages = nom => {
    return {
        'string.base':`${nom} ` + messageSubs["string"],
        'string.empty':`${nom} ` + messageSubs["empty"],
        'string.min':`${nom} ` + messageSubs["min"],
        'string.max':`${nom} ` + messageSubs["max"],
        'any.required':`${nom} ` + messageSubs["required"],
    }
}

let emailMessages = generateMessages("Votre e-mail");
emailMessages["string.email"] = "Votre e-mail n'est pas valide";
emailMessages["string.pattern.base"] = "Votre e-mail contient des caractères interdits";

let passwordMessages = generateMessages("Votre mot de passe");
passwordMessages["string.pattern.base"] = "Votre mot de passe doit avoir au moins une minuscule, une majuscule, un chiffre, un caractère spécial";

const AuthSchema = Joi.object({
    email:Joi.string()
             .trim()
             .lowercase()
             .email(emailOption)
             .pattern(/^[a-z0-9_.@-]{1,}$/)
             .required()
             .messages(
                emailMessages  
             ),
    password:Joi.string()
                .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/:+-.]).{1,}$/)
                .min(8)
                .max(128)
                .disallow(Joi.ref('email'))
                .required()
                .messages(
                    passwordMessages
                )

});

module.exports = AuthSchema;



