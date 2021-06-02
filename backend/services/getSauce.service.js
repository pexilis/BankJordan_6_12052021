const GetSauce = (() => {
    let self = {};
    let messageConfig = null;
    let sauceModel = null;

    self.init = (message, sauce) => {
        messageConfig = message;
        sauceModel = sauce;
    }
    
    self.run = async(id) => {
        const {undefinedMessage} = messageConfig;
        if ([id].includes(undefined))
            throw Error(undefinedMessage);
            
        const sauce = await sauceModel.findById(id);
        return {sauce};
    }

    return self;
})();

module.exports = GetSauce;