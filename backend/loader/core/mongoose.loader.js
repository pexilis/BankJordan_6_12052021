require("dotenv").config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    CLUSTER_HOST
} = process.env;

const mongoose = require("mongoose");
const MongooseGlobal = require("../../core/MongooseGlobal");

MongooseGlobal.initDep(mongoose);
MongooseGlobal.init(
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    CLUSTER_HOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

module.exports = MongooseGlobal;