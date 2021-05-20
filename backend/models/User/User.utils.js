require("dotenv").config();
const bcrypt = require("bcryptjs");
const aes = require("../../decoder/AES");

const {
    SALT_ROUNDS
} = process.env; 

const generatePassword = async(password) => {
    let salt = await bcrypt.genSalt(Number.parseInt(SALT_ROUNDS));
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

async function hashBeforeSave(element) {
    const {password} = this;
    const hashedPassword = await generatePassword(password);
    this.password = hashedPassword;
}

async function checkPassword(email, password) {
    const model = this;
    const encryptedEmail = aes.encrypt(email);
    const findUser = await model.findOne({email});
    const userExist = (findUser !== null);

    if (!userExist)
        throw new Error();

    const {password:hashedPassword} = findUser;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    
    if (!isValidPassword)
        throw new Error();
}

module.exports = {
    generatePassword,
    hashBeforeSave,
    checkPassword
}



