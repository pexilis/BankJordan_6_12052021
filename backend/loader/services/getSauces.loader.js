const GetSauces = require("../../services/getSauces.service");
const {sauceModel} = require("../model/sauce.loader");

GetSauces.init(
    sauceModel
);

module.exports = GetSauces.run;