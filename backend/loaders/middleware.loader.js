const {static, json, urlencoded} = require("express");
const loggers = require("../middleware/logger.middleware");
const globalProtection = require("../middleware/helmet.middleware.js");
const { limitRequestAPI,
        limitRequestRegister,
        limitRequestSign
    } = require("../middleware/limit.middleware");


const globalLoad = () => {
    loggers.map(logger => app.use(logger));
    globalProtection.map(header => app.use(header));
    
    app.use(urlencoded());
}

const apiLoad = () => {
    app.use('/api/sauces', limitRequestAPI)
}

const authLoad = () => {
    app.use('/api/auth/login', limitRequestSign);
    app.use('/api/auth/register', limitRequestRegister);
}

const staticLoad = () => {
    app.use('/images/', static('/public/images/sauces'))
}

const load = app => () => {
    globalLoad();
    apiLoad();
    authLoad();
    staticLoad();
}



module.exports = load;