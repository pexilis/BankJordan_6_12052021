const Logger = require("../../middlewares/logger.middleware");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");
const StringModule = require("../../core/StringModule");
const loggerConfig = require("../../config/logger.config");

require("dotenv").config();

const {
    NODE_ENV
} = process.env;

Logger.initDeps(
    morgan,
    rfs,
    path,
    StringModule
); 

Logger.initConfig(
    loggerConfig
);

Logger.initParam(
    NODE_ENV.trim()
);

module.exports = Logger.init();