require("dotenv").config();

const {
    SALT_ROUNDS,
} = process.env;


const Hash = require("../../core/Hash");
const bcryptjs = require("bcryptjs");


Hash.initDep(
    bcryptjs
);

Hash.init(
    SALT_ROUNDS
);

module.exports = Hash;