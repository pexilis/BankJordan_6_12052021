require("dotenv").config();

const {
    AES_KEY,
    AES_IV,
} = process.env;

const aes = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const Cipher = require("../../core/Cipher");

Cipher.initDeps(
    aes,
    CryptoJS
);

Cipher.init(
    AES_KEY,
    AES_IV
);

module.exports = Cipher;