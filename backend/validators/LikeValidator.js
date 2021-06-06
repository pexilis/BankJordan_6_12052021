const Joi = require("joi");

const guidOption = {
    version:["uuidv4"],
    separator:'-'
};

const messages = {
    'number.base':"Votre avis doit être un nombre",
    'number.empty':"Votre avis ne doit pas être vide",
    'number.min':"Votre avis doit être entre [-1, 0, 1]",
    'number.max':"Votre avis être entre [-1, 0, 1]",
    'any.required':"Votre avis doit être présent"
}

const LikeSchema = Joi.object({
    userId:Joi.string()
              .trim()
              .lowercase()
              .guid(guidOption)
              .required()
              .messages(messages),
    like:Joi.number()
            .min(-1)
            .max(1)
            .required()
            .messages(messages)
});

module.exports = LikeSchema;
