const Login = require("../../services/login.service");
const {userModel} = require("../model/user.loader");
const Token = require("../../core/Token");
const configMessage = require("../../config/message.config");

Login.init(
    userModel,
    Token,
    configMessage
);

module.exports = Login.run;