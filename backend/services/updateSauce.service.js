const UpdateSauce = (() => {
    let self = {};
    let sauceModel = null;
    let configMessage = null;

    const FileHandling = require("../core/FileHandling");
    const StringModule = require("../core/StringModule");

    self.initDep = model => {
        sauceModel = model;
    }

    self.initConfig = config => {
        configMessage = config;
    }

    self.simple = async(userId, id, sauce) => {
        const {undefinedMessage} = configMessage;
        if ([userId, id, sauce].includes(undefined))
            throw new Error(undefinedMessage);
        
        await sauceModel.canAccess(userId, id);

        const newSauce = await sauceModel.findByIdAndUpdate(id, sauce, {
            new:true,
            lean:true,
            strict:true,
        });
    }

    self.withFile = async(userId, id, sauce, file) => {
        const {undefinedMessage} = configMessage;
        if ([userId, id, sauce, file].includes(undefined))
            throw new Error(undefinedMessage);
    
        const {
            filename,
            path,
        } = file;

        await sauceModel.canAccess(userId, id);
        const obj = await sauceModel.findById(id, 'imageUrl');

        const {imageUrl} = obj;
        const imageName = StringModule.getFilenameFromPath(imageUrl);
        const relPathToDelete = StringModule.generateRelPath("public/images/sauces", imageName);
        await FileHandling.asyncDelete(relPathToDelete);

        sauce.imageUrl = filename;
        
        await sauceModel.findByIdAndUpdate(id, sauce, {
            new:true,
            lean:true,
            strict:true,
        });
    }

    return self;
})();

module.exports = UpdateSauce;
