const Cipher = (() => {
    let self = {};
    let aes = null;
    let CryptoJS = null;
    let key=null;
    let iv=null;

    self.initDeps = (aesDep, cryptoJSDep) => {
        aes = aesDep;
        CryptoJS = cryptoJSDep;
    }

    self.init = (aesKey, aesIV) => {
        key = CryptoJS.enc.Hex.parse(aesKey);
        iv = CryptoJS.enc.Hex.parse(aesIV);
    }

    self.encrypt = str => {
        return new Promise((resolve, reject) => {
            try {
                const cipherText = aes.encrypt(str, key, {iv}).toString();
                resolve(cipherText);
            } catch(e) {
                reject(e);
            }
        });
    }

    self.decrypt = str => {
        return new Promise((resolve, reject) => {
            try {
                const bytes  = aes.decrypt(str, key.toString(), {iv:iv.toString()});
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                resolve(originalText);
            } catch (e) {
                reject(e);
            }
        });
    }

    return self;
})();

module.exports = Cipher;