const Limiter = (() => {
    let self = {};
    let rateLimit = null; 
    let limitConfig = null;

    self.initDep = limiter => {
        rateLimit = limiter;
    }

    self.initConfig = config => {
        limitConfig = config;
    }

    self.init = () => {
        let {
                registerLimit,
                apiLimit,
                loginLimit
            } = limitConfig;

        const apiLimiter = rateLimit(apiLimit);
        const loginLimiter = rateLimit(loginLimit);
        const registerLimiter = rateLimit(registerLimit);
        
        return {
            apiLimiter,
            loginLimiter,
            registerLimiter
        };
    }

    return self;
})();

module.exports = Limiter;
