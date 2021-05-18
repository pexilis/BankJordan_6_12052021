const sauceModel = require("../models/Sauce/Sauce");

const getSauce = async(id, userId) => {
    await sauceModel.canAccess(userId, id);
    const sauce = await sauceModel.findById(id);
    return sauce;
};

module.exports = getSauce;