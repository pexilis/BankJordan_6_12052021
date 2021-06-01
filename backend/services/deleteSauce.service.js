const DeleteSauce = (() => {
    let self = {};

    let messageConfig = null;
    let sauceModel = null;

    self.init = (message, sauce) => {
        messageConfig = message;
        sauceModel = sauce;
    }

    self.run = async(userId, id) => {
        const {undefinedMessage} = messageConfig;
        if ([userId, id].includes(undefined))
            throw Error(undefinedMessage);
        
        await sauceModel.canAccess(userId, id);
        await sauceModel.findByIdAndDelete(id);
    }

    return self;
})();

module.exports = DeleteSauce;