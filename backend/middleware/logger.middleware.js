const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const todayName = require("../utils/todayFilename");

let loggers = [];

let streamOptions = {
    size:"10M",
    interval:"1d",
    path:path.resolve('./log/prod/')
}

const filename = todayName();

const generateClientStream = () => {
    return rfs.createStream(() => {
        return path.join('client_error/' + filename);
    }, streamOptions);
}

const generateServerStream = () => {
    return rfs.createStream(() => {
        return path.join('server_error/' + filename);
    }, streamOptions);
}

const generateInformationStream = () => {
    return rfs.createStream(() => {
        return path.join('information/' + filename);
    }, streamOptions);
}

const generateSuccessStream = () => {
    return rfs.createStream(() => {
        return path.join('success/' + filename);
    }, streamOptions);
}

const generateRedirectStream = () => {
    return rfs.createStream(() => {
        return path.join('redirect/' + filename);
    }, streamOptions);
}


const devLogging = () => {
    streamOptions.path = path.resolve('./log/dev/');

    console.log("Hello");
    loggers.push(morgan('dev', {
        stream: generateClientStream(),
        skip: (req, res) => (res.statusCode < 400 || res.statusCode > 499)
    }));

    loggers.push(morgan('dev', {
        stream: generateServerStream(),
        skip: (req, res) => (res.statusCode < 500 || res.statusCode > 599)
    }));

    loggers.push(morgan('dev', {
        stream: generateInformationStream(),
        skip: (req, res) => (res.statusCode < 100 || res.statusCode > 199)
    }));

    loggers.push(morgan('dev', {
        stream: generateSuccessStream(),
        skip: (req, res) => (res.statusCode < 200 || res.statusCode > 299)
    }));

    loggers.push(morgan('dev', {
        stream: generateRedirectStream(),
        skip: (req, res) => (res.statusCode < 300 || res.statusCode > 399)
    }));
}

const prodLogging = () => {
    loggers.push(morgan('combined', {
        stream: generateClientStream(),
        skip: (req, res) => (res.statusCode < 400 || res.statusCode > 499)
    }));

    loggers.push(morgan('combined', {
        stream: generateServerStream(),
        skip: (req, res) => (res.statusCode < 500 || res.statusCode > 599)
    }));

    loggers.push(morgan('combined', {
        stream: generateInformationStream(),
        skip: (req, res) => (res.statusCode < 100 || res.statusCode > 199)
    }));

    loggers.push(morgan('combined', {
        stream: generateSuccessStream(),
        skip: (req, res) => (res.statusCode < 200 || res.statusCode > 299)
    }));

    loggers.push(morgan('combined', {
        stream: generateRedirectStream(),
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
