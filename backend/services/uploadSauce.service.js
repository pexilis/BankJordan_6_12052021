const UploadSauce = (() => {
    let self = {};
    let SauceModel = null;
    let configMessage = null;
    let StringModule = null;

    self.initDep = (model, str) => {
        SauceModel = model;
        StringModule = str;
    }

    self.initConfig = message => {
        configMessage = message;
    }

    self.run = async(file, sauce, userId) => {
        const {undefinedMessage} = configMessage;
        if ([file, sauce].includes(undefined))
            throw Error(undefinedMessage);
    
        const {
            name,
            manufacturer,
            description,
            mainPepper,
            heat
        } = sauce; 

        let {path} = file;
        let imageName = StringModule.getFilenameFromPath(path);
    
        const sauceToAdd = new SauceModel({
            name,
            manufacturer,
            description,
            mainPepper,
            heat,
            userId,
            imageUrl:imageName,
        });

        await sauceToAdd.save();
    }

    return self;
})();


module.exports = UploadSauce;
