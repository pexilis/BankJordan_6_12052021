require("dotenv").config();

const {
    SERVER_HOSTNAME,
    APPLICATION_NAME,
    NODE_ENV
} = process.env;


const signConfig = {
    algorithm:"HS256",
    expiresIn:"30s",
    audience:SERVER_HOSTNAME,
    issuer:APPLICATION_NAME
};

const verifyConfig = {
    issuer:APPLICATION_NAME,
    audiance:SERVER_HOSTNAME,
    maxAge:"30s",
    algorithms:["HS256"]
}

module.exports = {
    signConfig,
    verifyConfig
};