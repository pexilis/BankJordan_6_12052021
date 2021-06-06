const UpdateSauce = require("../../services/updateSauce.service");
const {sauceModel} = require("../model/sauce.loader");
const messageConfig = require("../../config/message.config");

UpdateSauce.initConfig(
    messageConfig
);

UpdateSauce.initDep(
    sauceModel
);

module.exports = UpdateSauce;