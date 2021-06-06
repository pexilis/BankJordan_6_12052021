require("dotenv").config();

const {
    NODE_ENV,
    CLIENT_URL
} = process.env; 

const mode = NODE_ENV.trim().toLowerCase();

let complexReq = null;
let simpleReq = null;

(() => {
    if (mode === "dev") {
        const acceptedHost = CLIENT_URL;

        complexReq = {
            origin:acceptedHost,
            methods:["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            credentials:true,
        };

        simpleReq = {
            origin:acceptedHost,
        };
    }

    if (mode === "prod") {
        const acceptedHost = CLIENT_URL;
        complexReq = {
            origin:acceptedHost,
            methods:["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            credentials:true,
        };

        simpleReq = {
            origin:acceptedHost,
        };
    }
})();

module.exports = {
    complexReq,
    simpleReq
};