const sauceModel = require("../models/Sauce/Sauce");
const {undefinedMessage} = require("../config/message.config");


const getSauce = async(id, userId) => {
    if ([userId, id].includes(undefined))
        throw Error(undefinedMessage);
        
    await sauceModel.canAccess(userId, id);
    const sauce = await sauceModel.findById(id);
    return sauce;
};

module.exports = getSauce;