const ImageUpload = require("../../core/ImageUpload");
const configRegex = require("../../config/regex.config");
const StringModule = require("../../core/StringModule");
const multerLimit = require("../../config/image.config");

ImageUpload.initConfig(
    configRegex
);

ImageUpload.initDeps(
    StringModule
);

ImageUpload.initParam(
    "./public/images/sauces",
    function(req, file, cb) {
        let sauce = JSON.parse(req.body.sauce);
        let {
            name
        } = sauce;
       
        let ext = StringModule.extractExtension(file.originalname)

        cb(null, StringModule.generateImageName(name, ext));
    },
    4,
    254,
    multerLimit
);

module.exports = ImageUpload.init();