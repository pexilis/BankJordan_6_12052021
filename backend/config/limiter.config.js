require("dotenv").config();

const {
    MAX_LOGIN_ATTEMPT,
    MAX_REGISTER_ATTEMPT,
    MAX_QUERY_REQUEST,
} = process.env;

let apiLimit = null;
let loginLimit = null;
let registerLimit = null;

(() => {
    loginLimit = {
        windows:60 * 1000,
        max:MAX_LOGIN_ATTEMPT,
        message:`Vous avez dépassé le nombre de tentatives de connexion. Veuillez patienter !`,
        headers:false,
    }

    registerLimit = {
        windows:24 * 60 * 60 * 1000,
        max:MAX_REGISTER_ATTEMPT,
        message:`Vous avez dépassé le nombre d'inscription autorisé pour aujourd'hui`,
        headers:false,
    }
})();

module.exports = {
    registerLimit,
    loginLimit,
    apiLimit
};
