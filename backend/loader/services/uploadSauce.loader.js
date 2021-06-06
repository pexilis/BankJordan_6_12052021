const UploadSauce = require("../../services/uploadSauce.service");
const configMessage = require("../../config/message.config");
const {sauceModel} = require("../model/sauce.loader");
const StringModule = require("../../core/StringModule");

UploadSauce.initConfig(
    configMessage
);

UploadSauce.initDep(
    sauceModel,
    StringModule
);

module.exports = UploadSauce.run;