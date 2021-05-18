const rateLimit = require("express-rate-limit");
const {registerLimit, apiLimit, signLimit} = require("../config/limiter.config");


const limitRequestAPI = rateLimit(apiLimit);
const limitRequestRegister = rateLimit(registerLimit);
const limitRequestSign = rateLimit(signLimit);



module.exports = {
    limitRequestAPI,
    limitRequestRegister,
    limitRequestSign
};