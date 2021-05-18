const sauceModel = require("../models/Sauce/Sauce");

const getSauces = async() => {
    const sauces = await sauceModel.find();

    return {
        sauces
    }
};

module.exports = getSauces;