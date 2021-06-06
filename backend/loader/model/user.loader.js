const mongoose = require("mongoose");
const uniqueMongoose = require("mongoose-unique-validator");
const {v4:uuidv4} = require("uuid");

const messageConfig = require("../../config/message.config");
const regexConfig = require("../../config/regex.config");

const Cipher = require("../core/cipher.loader");
const Hash = require("../../core/Hash");

const UserUtils = require("../../models/User/User.utils");
const UserModel = require("../../models/User/User");
const UserUtilsDep = UserUtils.dependencies;

UserUtilsDep.initDeps(
    Hash,
    Cipher
);

UserModel.initDep(
    mongoose,
    uniqueMongoose,
    uuidv4
);

UserModel.initConfig(
    regexConfig,
    messageConfig
);

const {userModel, userSchema} = UserModel.init();

module.exports = {
    userModel,
    userSchema
};