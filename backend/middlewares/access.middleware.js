const Access = (() => {
    let self = {}; 
    let Token = null;

    self.init = token => {
        Token = token;
    }

    self.isLogin = async(req, res, next) => {
        const {headers} = req; 
        const {authorization} = headers;
    
        const token = authorization?.split(" ")[1];
    
        try {
            const result = await Token.asyncVerify(token);
            const {userId} = result;
    
            if (!userId)
                throw Error();
    
            req.userId = userId;
            next();
        }catch(e) {
            res.status(401).end();
        }
    }

    self.isLogout = async(req, res, next) => {
        const {headers} = req; 
        const {authorization} = headers;
    
        const token = authorization?.split(" ")[1];
    
        try {
            const result = await Token.asyncVerify(token);
            const {userId} = result;
    
            if (!userId)
                throw Error();
    
            res.status(401).end();
        }catch(e) {
            next();
        }
    }

    return self;
})();

module.exports = Access;









