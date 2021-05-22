const userModel = require("../models/User/User");
const aes = require("../decoder/AES");
const {undefinedMessage} = require("../config/message.config");

class Register {
    async run(email, password) {
        if ([email, password].includes(undefined))
            throw Error(undefinedMessage);

        const hashedEmail = await aes.encrypt(email);
        const userData = {
            email:hashedEmail,
            password
        }; 

        const userObj = new userModel(userData);
        await userObj.save();
    }
}

module.exports = Register;