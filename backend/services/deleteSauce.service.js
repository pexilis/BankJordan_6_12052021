const sauceModel = require("../models/Sauce/Sauce");
const {undefinedMessage} = require("../config/message.config");

const deleteSauce = async(userId, id) => {
    if ([userId, id].includes(undefined))
        throw Error(undefinedMessage);

    await sauceModel.canAccess(userId, id);
    await sauceModel.findByIdAndDelete(id);
}

module.exports = deleteSauce;