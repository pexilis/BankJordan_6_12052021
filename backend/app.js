require("dotenv").config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    CLUSTER_HOST,
    PORT,
    SERVER_HOSTNAME,
    SALT_ROUNDS,
    PROTOCOL,
    AES_KEY,
    AES_IV,
    JWT_SECRET
} = process.env;

let app = null;

/* NPM DEPENDENCIES */
const aes = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const uniqueMongoose = require("mongoose-unique-validator");
const {v4:uuidv4} = require("uuid");
const jsonwebtoken = require("jsonwebtoken");
const express = require("express");

/* CONFIG */
const messageConfig = require("./config/message.config");
const regexConfig = require("./config/regex.config");
const jwtConfig = require("./config/jwt.config");


/* CORE */
const Cipher = require("./core/Cipher");
const Hash = require("./core/Hash");
const MongooseGlobal = require("./core/MongooseGlobal");
const ExpressGlobal = require("./core/ExpressGlobal");
const Token = require("./core/Token");

/* User Model */
const UserUtils = require("./models/User/User.utils");
const UserModel = require("./models/User/User");
const UserUtilsDep = UserUtils.dependencies;

/* Sauce Model */



/* Services */

const LoginService = require("./services/login.service");


/* Token init*/
Token.initGenerator(jsonwebtoken);
Token.initParams(
    JWT_SECRET,
    jwtConfig
);

/* Hash Init */
Hash.initDep(
    bcryptjs
);

Hash.init(
    SALT_ROUNDS
);

/* UserModel Init */


/* SauceModel Init */



/* LoginService Init */

LoginService.init(
    userModel,
    Token,
    messageConfig
);

/* Express Init */
ExpressGlobal.initDep(express);

ExpressGlobal.init(
    SERVER_HOSTNAME,
    PORT,
    PROTOCOL
);

app = ExpressGlobal.getApp();


(async() => {
    try {
        await MongooseGlobal.connect();
        await ExpressGlobal.listen();
    } catch(e) {
        console.log(`Error handled : ${e}`);
    } 
})();