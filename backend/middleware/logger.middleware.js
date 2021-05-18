const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const todayName = require("../utils/todayFilename");
const {prodOption, devOption} = require("../config/logger.config");


let loggers = [];
const filename = todayName();

const generateStream = (options, pathStream) => {
    return rfs.createStream(() => {
        return path.join(pathStream + filename);
    }, options);
}

const devLogging = () => {
    loggers.push(morgan('dev', {
        stream: generateStream(devOption, '/client_error/'),
        skip: (req, res) => (res.statusCode < 400 || res.statusCode > 499)
    }));

    loggers.push(morgan('dev', {
        stream: generateStream(devOption, '/server_error/'),
        skip: (req, res) => (res.statusCode < 500 || res.statusCode > 599)
    }));

    loggers.push(morgan('dev', {
        stream: generateStream(devOption, '/information/'),
        skip: (req, res) => (res.statusCode < 100 || res.statusCode > 199)
    }));

    loggers.push(morgan('dev', {
        stream: generateStream(devOption, '/success/'),
        skip: (req, res) => (res.statusCode < 200 || res.statusCode > 299)
    }));

    loggers.push(morgan('dev', {
        stream: generateStream(devOption, '/redirect/'),
        skip: (req, res) => (res.statusCode < 300 || res.statusCode > 399)
    }));
}

const prodLogging = () => {
    loggers.push(morgan('combined', {
        stream: generateStream(prodOption, '/client_error/'),
        skip: (req, res) => (res.statusCode < 400 || res.statusCode > 499)
    }));

    loggers.push(morgan('combined', {
        stream: generateStream(prodOption, '/server_error/'),
        skip: (req, res) => (res.statusCode < 500 || res.statusCode > 599)
    }));

    loggers.push(morgan('combined', {
        stream: generateStream(prodOption, '/information/'),
        skip: (req, res) => (res.statusCode < 100 || res.statusCode > 199)
    }));

    loggers.push(morgan('combined', {
        stream: generateStream(prodOption, '/success/'),
        skip: (req, res) => (res.statusCode < 200 || res.statusCode > 299)
    }));

    loggers.push(morgan('combined', {
        stream: generateStream(prodOption, '/redirect/'),
        skip: (req, res) => (res.statusCode < 300 || res.statusCode > 399)
    }));
}

(() => {
    const mode = process.env.NODE_ENV.trim();
    
    if (mode === "dev")
        devLogging();
    if (mode === "prod")
        prodLogging();
 
})();

module.exports = loggers;
