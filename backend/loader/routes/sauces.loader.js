const Sauces = require("../../routes/sauces.route");

const corsConfig = require("../../config/cors.config");

const Access = require("../middlewares/access.loader");

const GetSauces = require("../services/getSauces.loader");
const GetSauce = require("../services/getSauce.loader");
const UploadSauce = require("../services/uploadSauce.loader");
const UpdateSauce = require("../services/updateSauce.loader");
const DeleteSauce = require("../services/deleteSauce.loader");
const LikeSauce = require("../services/likeSauce.loader");

Sauces.initConfig(
    corsConfig
)

Sauces.initMiddleware(
    Access
)

Sauces.initServices(
    GetSauces,
    GetSauce,
    UploadSauce,
    UpdateSauce,
    DeleteSauce,
    LikeSauce
);

module.exports = Sauces.init();