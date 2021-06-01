require("dotenv").config();

const {
    JWT_SECRET
} = process.env;

const jsonwebtoken = require("jsonwebtoken");
const {signConfig, verifyConfig} = require("../../config/jwt.config");
const Token = require("../../core/Token");

Token.initGenerator(jsonwebtoken);
Token.initParams(
    JWT_SECRET,
    signConfig,
    verifyConfig
);

module.exports = Token;
