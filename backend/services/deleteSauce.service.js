const DeleteSauce = (() => {
    let self = {};

    let messageConfig = null;
    let sauceModel = null;

    const FileHandling = require("../core/FileHandling");
    const StringModule = require("../core/StringModule");

    self.init = (message, sauce) => {
        messageConfig = message;
        sauceModel = sauce;
    }

    self.deleteFile = async(imageName) => {
        const relPathToDelete = StringModule.generateRelPath("public/images/sauces", imageName);
        await FileHandling.asyncDelete(relPathToDelete);
    }

    self.run = async(userId, id) => {
        const {undefinedMessage} = messageConfig;
        if ([userId, id].includes(undefined))
            throw Error(undefinedMessage);
        
        await sauceModel.canAccess(userId, id);
        const sauce = await sauceModel.findByIdAndDelete(id);

        const {imageUrl} = sauce;
        const imageName = StringModule.getFilenameFromPath(imageUrl);
        await self.deleteFile(imageName);
        
    }

    return self;
})();

module.exports = DeleteSauce;