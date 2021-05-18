const sauceModel = require("../models/Sauce/Sauce");

const deleteSauce = async(userId, id) => {
    await sauceModel.canAccess(userId, id);
    await sauceModel.findByIdAndDelete(id);
}

module.exports = deleteSauce;