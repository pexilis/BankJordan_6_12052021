const Token = (() => {
    let self = {};
    let TokenGenerator = null;
    let secret = null;
    let signOptions = null;
    let verifyOptions = null;

    self.initGenerator = generator => {
        TokenGenerator = generator;
    }

    self.initParams = (secretParam, options, verify) => {
        secret = secretParam;
        signOptions = options;
        verifyOptions = verify;
    }

    self.asyncSign = (payload) => {
        return new Promise((resolve, reject) => {
            return TokenGenerator.sign(payload, secret, signOptions, (err, token) => {
                if (token && !err){
                    resolve(token);
                } else { 
                    reject(err);
                }
            });
        });
    }

    self.asyncVerify = (payload) => {
        return new Promise((resolve, reject) => {
            return TokenGenerator.verify(payload, secret, verifyOptions, (err, decoded) => {
                if (!err && decoded) {
                    resolve(decoded);
                } else {
                    reject(err);
                }
            })
        })
    }

    return self;
})();

module.exports = Token;