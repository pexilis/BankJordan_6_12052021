const {static, json, urlencoded} = require("express");
const rateLimit = require("express-rate-limit");
const loggers = require("../middleware/logger.middleware");
const globalProtection = require("../middleware/helmet.middleware.js");


const load = app => {
    loggers.map(logger => app.use(logger));
    globalProtection.map(header => app.use(header));
    app.use(json());
    app.use(urlencoded());
    app.use('/images/sauces/', static('public/images/sauces/'));
}

module.exports = load;