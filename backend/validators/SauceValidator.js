const Joi = require("joi");

const guidOption = {
        version:["uuidv4"],
        separator:'-'
};

const messageSubs = {
        disallow:"contient des caractères interdits",
        string:"doit être une chaîne de caractères",
        empty:"ne doit pas être vide",
        min:"doit avoir au moins {#limit} caractères",
        max:"ne peut pas avoir plus de {#limit} caractères",
        required:"doit être présent"
}
    
const generateMessages = name => {
        return {
                'string.pattern.base':`${name} de la sauce ` + messageSubs["disallow"],
                'string.base':`${name} de la sauce ` + messageSubs["string"],
                'string.empty':`${name} de la sauce ` + messageSubs["empty"],
                'string.min':`${name} de la sauce ` + messageSubs["min"],
                'string.max':`${name} de la sauce ` + messageSubs["max"],
                'any.required':`${name} de la sauce ` + messageSubs["required"],
        }
}

const SauceSchema = Joi.object({
    name:Joi.string()
            .trim()
            .pattern(/^[a-zA-ZÀ-ÿ' ]+$/)
            .min(4)
            .max(40)
            .required()
            .messages(
                generateMessages("Nom")
            ),
    heat:Joi.number()
            .min(1)
            .max(10)
            .required(),
    mainPepper:Joi.string()
                  .trim()
                  .pattern(/^[a-zA-ZÀ-ÿ' ]+$/)
                  .lowercase()
                  .min(4)
                  .max(40)
                  .messages(
                        generateMessages("Ingrédient principal")
                  ),
    manufacturer:Joi.string()
                    .trim()
                    .alphanum()
                    .lowercase()
                    .min(4)
                    .max(40)
                    .messages(
                        generateMessages("Fabriquant de la sauce")
                    ),
    description:Joi.string()
                   .trim()
                   .lowercase()
                   .min(4)
                   .max(1024)
                   .required()
                   .messages(
                        generateMessages("Description")
                   ),
    userId:Joi.string()
              .trim()
              .lowercase()
              .guid(guidOption)
              .required()
              .messages(generateMessages("Id de l'utilisateur"))
});

module.exports = SauceSchema;