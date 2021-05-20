const userModel = require("../models/User/User");
const aes = require("../decoder/AES");

const register = async(email, password) => {
    const hashedEmail = await aes.encrypt(email);
    const userData = {
        email:hashedEmail,
        password
    }; 

    const userObj = new userModel(userData);
    await userObj.save();
};

module.exports = register;