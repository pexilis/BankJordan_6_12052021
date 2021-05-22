const sauceModel = require("../models/Sauce/Sauce");

class GetSauces {
    async run() {
        const sauces = await sauceModel.find();
        return {
            sauces
        }
    }
}

module.exports = GetSauces;