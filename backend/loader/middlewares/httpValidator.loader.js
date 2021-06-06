const HttpValidator = require("../../middlewares/httpValidator.middleware");
const httpConfig = require("../../config/http.config");

HttpValidator.initConfig(httpConfig);

module.exports = HttpValidator;