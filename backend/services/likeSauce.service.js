const LikeSauce = (() => {
    let self = {};
    let sauceModel = null;
    let messageConfig = null;

    self.init = (sauce, message) => {
        sauceModel = sauce;
        messageConfig = message;
    }

    self.run = async(userId, id, like) => {
        const {undefinedMessage} = messageConfig;
        if ([userId, id, like].includes(undefined))
            throw Error(undefinedMessage);
        
        await sauceModel.likeSauce(userId, id, like);
    }

    return self;
})();

module.exports = LikeSauce;
