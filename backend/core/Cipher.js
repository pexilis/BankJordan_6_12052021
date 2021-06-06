const CryptoJS = require("crypto-js");
const aes = CryptoJS.AES;

class AESCipher {
    constructor(key, iv) {
        this.key = CryptoJS.enc.Utf8.parse(key);
        this.iv = CryptoJS.enc.Utf8.parse(iv);
    }

    async encrypt(str) {
        const {key, iv} = this;
        return new Promise((resolve, reject) => {
            try {
                const cipherText = aes.encrypt(str, key, {iv, mode: CryptoJS.mode.ECB}).toString();
                resolve(cipherText);
            } catch(e) {
                reject(e);
            }
        });
    }

    async decrypt(str) {
        const {key, iv} = this;
        return new Promise((resolve, reject) => {
            try {
                const bytes  = aes.decrypt(str, key, {iv, mode: CryptoJS.mode.ECB});
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                resolve(originalText);
            } catch (e) {
                reject(e);
            }
        });
    }
}

class PrivateKeyCipher {
    constructor(cipher) {
        this.cipher = cipher;
    }

    async encrypt(str) {
        return await this.cipher.encrypt(str);
    }

    async decrypt(str) {
        return await this.cipher.decrypt(str);
    }
}

module.exports = {AESCipher, PrivateKeyCipher};