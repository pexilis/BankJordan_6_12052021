const GetSauce = require("../../services/getSauce.service");
const configMessage = require("../../config/message.config");
const {sauceModel} = require("../model/sauce.loader");

GetSauce.init(
    configMessage,
    sauceModel
);

module.exports = GetSauce.run;