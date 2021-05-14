const aes = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const {
    AES_KEY,
    AES_IV
} = process.env;

const key = CryptoJS.enc.Hex.parse(AES_KEY);
const iv = CryptoJS.enc.Hex.parse(AES_IV);

const encrypt = str => {
    if ([str].includes(undefined))
        throw Error("Undefined Error");
    
    const cipherText = aes.encrypt(str, key, {iv}).toString();
    return cipherText;
}

const decrypt = str => {
    const bytes  = aes.decrypt(str, key, {iv});
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

module.exports = {
    encrypt,
    decrypt
}



