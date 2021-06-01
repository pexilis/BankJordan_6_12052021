require("dotenv").config();

const {
    PORT,
    SERVER_HOSTNAME,
    PROTOCOL
} = process.env;

const mongoose = require("mongoose");
const regexConfig = require("../../config/regex.config");

const SauceUtils = require("../../models/Sauce/Sauce.utils");
const Sauce = require("../../models/Sauce/Sauce");

Sauce.initDeps(
    mongoose
);

Sauce.initConfig(
    regexConfig
);

Sauce.initParam(
    SERVER_HOSTNAME,
    PROTOCOL,
    PORT
);

const {sauceModel, sauceSchema} = Sauce.init();

module.exports = {
    sauceModel, 
    sauceSchema
};
