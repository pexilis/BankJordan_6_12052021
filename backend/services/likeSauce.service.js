const sauceModel = require("../models/Sauce/Sauce");
const {undefinedMessage} = require("../config/message.config");

class LikeSauce {
    async run(userIdReq, userId, id, like) {
        if ([userId, id, like, userIdReq].includes(undefined))
            throw Error(undefinedMessage);

        const areSame = (userIdReq === userId);
        if (!areSame)
            throw Error();
    
        await sauceModel.likeSauce(userId, id, like);
    }
}

module.exports = LikeSauce;
