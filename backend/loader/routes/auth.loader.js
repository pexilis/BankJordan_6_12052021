const Auth = require("../../routes/auth.route");
const {simpleReq, complexReq} = require("../../config/cors.config");
const express = require("express");
const cors = require("cors");

const isLogout = require("../middlewares/access.loader").isLogout;
const Login = require("../services/login.loader");
const Register = require("../services/register.loader");

Auth.initConfig(
    simpleReq,
    complexReq
); 

Auth.initDeps(
    express,
    cors
);

Auth.initMiddlewares(
    isLogout
)

Auth.initServices(
    Login,
    Register
);

const AuthRoute = Auth.initRoute();

module.exports = AuthRoute;
