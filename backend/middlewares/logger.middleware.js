const Logger = (() => {
    let self = {};
    let morgan = null;
    let rfs = null;
    let path = null;
    let StringModule = null;
    
    let loggerConfig = null; 

    let mode = null;

    self.initDeps = (morganDep, rfsDep, pathDep, strDep) => {
        morgan = morganDep;
        rfs = rfsDep;
        path = pathDep;
        StringModule = strDep;

        
    }

    self.initConfig = (config) => {
        loggerConfig = config;
    }

    self.initParam = modeParam => {
        mode = modeParam;
    }

    const generateStream = (options, pathStream, filename) => {
        return rfs.createStream(() => {
            return path.join(pathStream + filename);
        }, options);
    }

    const devLogging = (loggers, filename) => {
        const {devOption} = loggerConfig;
        loggers.push(morgan('dev', {
            stream: generateStream(devOption, '/client_error/', filename),
            skip: (req, res) => (res.statusCode < 400 || res.statusCode > 499)
        }));
    
        loggers.push(morgan('dev', {
            stream: generateStream(devOption, '/server_error/', filename),
            skip: (req, res) => (res.statusCode < 500 || res.statusCode > 599)
        }));
    
        loggers.push(morgan('dev', {
            stream: generateStream(devOption, '/information/', filename),
            skip: (req, res) => (res.statusCode < 100 || res.statusCode > 199)
        }));
    
        loggers.push(morgan('dev', {
            stream: generateStream(devOption, '/success/', filename),
            skip: (req, res) => (res.statusCode < 200 || res.statusCode > 299)
        }));
    
        loggers.push(morgan('dev', {
            stream: generateStream(devOption, '/redirect/', filename),
            skip: (req, res) => (res.statusCode < 300 || res.statusCode > 399)
        }));
    }
    
    const prodLogging = (loggers, filename) => {
        loggers.push(morgan('combined', {
            stream: generateStream(prodOption, '/client_error/', filename),
            skip: (req, res) => (res.statusCode < 400 || res.statusCode > 499)
        }));
    
        loggers.push(morgan('combined', {
            stream: generateStream(prodOption, '/server_error/', filename),
            skip: (req, res) => (res.statusCode < 500 || res.statusCode > 599)
        }));
    
        loggers.push(morgan('combined', {
            stream: generateStream(prodOption, '/information/', filename),
            skip: (req, res) => (res.statusCode < 100 || res.statusCode > 199)
        }));
    
        loggers.push(morgan('combined', {
            stream: generateStream(prodOption, '/success/', filename),
            skip: (req, res) => (res.statusCode < 200 || res.statusCode > 299)
        }));
    
        loggers.push(morgan('combined', {
            stream: generateStream(prodOption, '/redirect/', filename),
            skip: (req, res) => (res.statusCode < 300 || res.statusCode > 399)
        }));
    }

    self.init = () => {
        let loggers = [];
        const filename = StringModule.generateLogFilename();

        if (mode === "dev")
            devLogging(loggers, filename);
        if (mode === "prod")
            prodLogging(loggers, filename);
        
        
        return loggers;
    }

    return self;
})();


module.exports = Logger;
