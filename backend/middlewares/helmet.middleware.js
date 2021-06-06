const Helmet = (() => {
    let helmet = require("helmet");

    let self = [
        helmet.hidePoweredBy(),
        helmet.noSniff(),
        helmet.dnsPrefetchControl(),
        helmet.ieNoOpen(),
        helmet.referrerPolicy()
    ]

    return self;
})();

module.exports = Helmet;

