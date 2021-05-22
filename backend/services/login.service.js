const userModel = require("../models/User/User");
const {asyncSign} = require("../utils/asyncJWT");
const {jwtConfig} = require("../config/jwt.config");
const {undefinedMessage} = require("../config/message.config");


require("dotenv").config();

const {
    JWT_SECRET
} = process.env;

class Login {
    async run(email, password) {
        if ([email, password].includes(undefined))
            throw Error(undefinedMessage);

        const findedUser = await userModel.checkPassword(email, password);
        const {userId} = findedUser;
        const token = await asyncSign({userId}, JWT_SECRET, jwtConfig);

        return {
            token,
            userId
        };
    }
}


module.exports = Login;