const jwt = require("jsonwebtoken");

const asyncSign = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        return jwt.sign(payload, secret, options, (err, token) => {
            if (token && !err){
                resolve(token);
            } else { 
                reject(token);
            }
        });
    });
};

const asyncVerify = (token, secret, options) => {
    return new Promise((resolve, reject) => {
        return jwt.verify(token, secret, options, (err, decoded) => {
            if (!err && decoded) {
                resolve(decoded);
            } else {
                reject(err);
            }
        })
    })
}

module.exports = {
    asyncSign,
    asyncVerify
};