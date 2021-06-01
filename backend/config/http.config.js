require("dotenv").config();

const {
    NODE_ENV,
    SERVER_HOSTNAME
} = process.env; 

const mode = NODE_ENV.trim().toLowerCase();

let validMethods = null;
let validContentTypes = null;

(() => {
    if (mode === "prod") {
        validMethods = [
            "GET",
            "OPTIONS",
            "POST",
            "PUT",
            "DELETE"
        ];
        
        validHosts = [
            SERVER_HOSTNAME,
        ]
    }

    if (mode === "dev") {
        validHosts = [
            SERVER_HOSTNAME
        ];

        validContentTypes = [
            "application/json"
        ]; 
    }
})();


module.exports = {
    validMethods,
    validContentTypes,
    validHosts
};