const Limiter = require("../../middlewares/limit.middleware");
const limiter = require("express-rate-limit");
const limiterConfig = require("../../config/limiter.config");


Limiter.initConfig(
    limiterConfig
);

Limiter.initDep(
    limiter
);

module.exports = Limiter.init();