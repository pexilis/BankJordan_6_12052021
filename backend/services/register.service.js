const Register = (() => {
    let self = {};

    let userModel = null;
    let aes = null;
    let configMessage = null;

    self.init = (model, cipher, message) => {
        userModel = model;
        aes = cipher;
        configMessage = message;
    }

    self.run = async(email, password) => {
        const {undefinedMessage} = configMessage;
        if ([email, password].includes(undefined))
            throw Error(undefinedMessage);

        const hashedEmail = await aes.encrypt(email);
        const userData = {
            email:hashedEmail,
            password
        }; 

        const userObj = new userModel(userData);
        await userObj.save();
    }

    return self;
})();

module.exports = Register;