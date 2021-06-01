const HttpValidator = (() => {
    let self = {};

    self.initConfig = config => {
        validatorConfig = config;
    }

    self.validateMethod = (req, res, next) => {
        const {validMethods} = validatorConfig;
        const method = req.method.toUpperCase();
        const isMethodValid = validMethods ? validMethods.includes(method) : true;

        if (!isMethodValid) 
            res.status(405).end();
        
        next();
    }

    self.validateContentType = (req, res, next) => {
        const {validContentTypes} = validatorConfig;
        const contentType = req.headers["content-type"];
        const isCTValid = validContentTypes ? validContentTypes.includes(contentType) : true;

        if (!isCTValid)
            res.status(415).end();
        
        next();
    }

    self.validateHost = (req, res, next) => {
        const {validHosts} = validatorConfig;
        const host = req.headers["host"];
        const isHostValid = validHosts ? validHosts.includes(host) : true;

        console.log(isHostValid);
        if (!isHostValid)
            res.status(400).end();
        
        next();
    }

    return self;
})();

module.exports = HttpValidator;