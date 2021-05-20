const {
    asyncSign,
    asyncVerify
} = require("../utils/AsyncJWT");


const jwtConfig = require("../config/jwt.config");
require("dotenv").config(); 

const {
    JWT_SECRET
} = process.env;

const isLogin = async(req, res, next) => {
    const {headers} = req; 
    const {authorization} = headers;

    const token = authorization?.split(" ")[1];

    try {
        const result = await asyncVerify(token, privateKey, jwtConfig);
        const {userId} = result;

        if (!userId)
            throw Error();

        req.body["userId"] = userId;
        next();
    }catch(e) {
        res.status(401).end();
    }

}

const isLogout = async(req, res, next) => {
    const {headers} = req; 
    const {authorization} = headers;

    const token = authorization?.split(" ")[1];

    try {
        const result = await asyncVerify(token, privateKey, jwtConfig);
        const {userId} = result;

        if (!userId)
            throw Error();

        res.status(401).end();
    }catch(e) {
        next();
    }
}

module.exports = {
    isLogin,
    isLogout
};









