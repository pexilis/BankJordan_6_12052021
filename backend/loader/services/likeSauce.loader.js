const LikeSauce = require("../../services/likeSauce.service");
const configMessage = require("../../config/message.config");
const sauceModel = require("../model/sauce.loader");

LikeSauce.init(
    sauceModel,
    configMessage
);

module.exports = LikeSauce;