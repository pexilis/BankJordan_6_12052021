require("dotenv").config();

const {
    AES_KEY,
    AES_IV,
} = process.env;

const {AESCipher, PrivateKeyCipher} = require("../../core/Cipher");

const aesCipher = new AESCipher(AES_KEY, AES_IV);
const cipher = new PrivateKeyCipher(aesCipher);

module.exports = cipher;