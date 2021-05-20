const {static, json, urlencoded} = require("express");
const loggers = require("../middleware/logger.middleware");
const globalProtection = require("../middleware/helmet.middleware.js");
const { limitRequestAPI,
        limitRequestRegister,
        limitRequestSign
    } = require("../middleware/limit.middleware");


const globalLoad = (app) => {
    loggers.map(logger => app.use(logger));
    globalProtection.map(header => app.use(header));
    
    app.use(json());
}

const apiLoad = (app) => {
    app.use('/api/sauces', limitRequestAPI)
}

const authLoad = (app) => {
    app.use('/api/auth/login', limitRequestSign);
    app.use('/api/auth/register', limitRequestRegister);
}

const staticLoad = (app) => {
    app.use('/images/', static('/public/images/sauces'))
}

const load = app => {
    console.log("Hello");
    globalLoad(app);
    apiLoad(app);
    authLoad(app);
    staticLoad(app);
}



module.exports = load;