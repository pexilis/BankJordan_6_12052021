const Joi = require("joi");

const guidOption = {
    version:["uuidv4"],
    separator:'-'
};

const LikeSchema = Joi.object({
    userId:Joi.string()
              .trim()
              .lowercase()
              .guid(guidOption)
              .required(),
    like:Joi.number()
            .min(-1)
            .max(1)
            .required()
});

module.exports = LikeSchema;
