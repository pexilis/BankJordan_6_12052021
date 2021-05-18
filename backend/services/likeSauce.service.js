const sauceModel = require("../models/Sauce/Sauce");


const likeSauce = async(userIdReq, userId, id, like) => {
    const areSame = (userIdReq === userId);
    if (!areSame)
        throw Error();
    
    await sauceModel.likeSauce(userId, id, like);
}