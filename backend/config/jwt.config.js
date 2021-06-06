require("dotenv").config();

const {
    SERVER_HOSTNAME,
    APPLICATION_NAME,
    NODE_ENV,
    TOKEN_EXPIRATION_TIME
} = process.env;


const signConfig = {
    algorithm:"HS256",
    expiresIn:TOKEN_EXPIRATION_TIME,
    audience:SERVER_HOSTNAME,
    issuer:APPLICATION_NAME
};

const verifyConfig = {
    issuer:APPLICATION_NAME,
    audiance:SERVER_HOSTNAME,
    maxAge:TOKEN_EXPIRATION_TIME,
    algorithms:["HS256"]
}

module.exports = {
    signConfig,
    verifyConfig
};