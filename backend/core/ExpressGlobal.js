const ExpressGlobal = (() => {
    let self = {};
    let express = null;
    host = null;
    port = null;
    protocol = null;
    self.app = null;

    self.init = (hostExpress, portExpress, protocolExpress) => {
        host = hostExpress;
        port = portExpress || 3000;
        protocol = protocolExpress;
    }

    self.initDep = expressDep => {
        express = expressDep;
        self.app = express();
    }

    self.getApp = () => {
        return self.app;
    }

    self.listen = () => {
        self.app.listen(port, () => {
            console.log(`Server is listening on ${protocol}://${host}:${port}`);
        });
    }

    return self;
})();

module.exports = ExpressGlobal;