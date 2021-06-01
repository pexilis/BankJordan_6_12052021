const DeleteSauce = require("../../services/deleteSauce.service");
const configMessage = require("../../config/message.config");
const sauceModel = require("../model/sauce.loader");

DeleteSauce.init(
    configMessage,
    sauceModel
);

module.exports = DeleteSauce;