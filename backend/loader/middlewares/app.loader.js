const {static, json, urlencoded} = require("express");
const ExpressGlobal = require("../core/express.loader");
const app = ExpressGlobal.getApp();
const Helmet = require("../../middlewares/helmet.middleware");
const hpp = require("hpp");

const {
    apiLimiter,
    loginLimiter,
    registerLimiter
} = require("../middlewares/limiter.loader");
const Loggers = require("../middlewares/logger.loader");

const HttpValidator = require("../middlewares/httpValidator.loader");



/* Logging */
Loggers.map(logger => app.use(logger));

/* Http Security */
Helmet.map(helmet => app.use(helmet));

/* Request Validator */
    app.use(HttpValidator.validateMethod);
    app.use(HttpValidator.validateHost);
    

/* Rate Limit */
    app.use('/api/auth/login', loginLimiter);
    app.use('/api/auth/signup', registerLimiter);




/* Static File */
app.use('/images', static('./public/images/sauces'));

/* JSON Parse */
app.use(urlencoded());
app.use('/api', json());
app.use(hpp());



app.use((err, req, res, next) => {
    res.status(400).end();
});

module.exports = app;