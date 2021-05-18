
const helmet = require("helmet");

const globalProtection = [
    helmet.xssFilter(),
    helmet.hidePoweredBy(),
    helmet.noSniff(),
    helmet.dnsPrefetchControl(),
    helmet.ieNoOpen(),
    helmet.referrerPolicy()
];

module.exports = globalProtection;

