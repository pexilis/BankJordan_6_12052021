const sauceModel = require("../models/Sauce/Sauce");
const {undefinedMessage} = require("../config/message.config");


const likeSauce = async(userIdReq, userId, id, like) => {
    if ([userId, id, like, userIdReq].includes(undefined))
        throw Error(undefinedMessage);

    const areSame = (userIdReq === userId);
    if (!areSame)
        throw Error();
    
    await sauceModel.likeSauce(userId, id, like);
}