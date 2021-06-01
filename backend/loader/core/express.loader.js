require("dotenv").config();

const {
    PORT,
    SERVER_HOSTNAME,
    PROTOCOL,
} = process.env;


const express = require("express");
const ExpressGlobal = require("../../core/ExpressGlobal");

ExpressGlobal.initDep(express);
ExpressGlobal.init(
    SERVER_HOSTNAME,
    PORT,
    PROTOCOL
);

module.exports = ExpressGlobal;
