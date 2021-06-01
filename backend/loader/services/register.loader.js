const Register = require("../../services/register.service");

const {userModel} = require("../model/user.loader");
const Cipher = require("../../core/Cipher");
const configMessage = require("../../config/message.config");

Register.init(
    userModel,
    Cipher,
    configMessage
); 

module.exports = Register.run;



