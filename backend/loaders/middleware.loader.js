const helmet = require("helmet");
const cors = require("cors");
const {static, json, urlencoded} = require("express");
const rateLimite = require("express-rate-limit");
const loggers = require("../middleware/logger.middleware");

const load = app => {
    loggers.map(logger => app.use(logger));
    app.use(helmet());
    app.use(cors());
    app.use(json());
    app.use(urlencoded());
    app.use('/images/sauces/', static('public/images/sauces/'));
}

module.exports = load;