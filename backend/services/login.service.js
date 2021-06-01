const LoginService = (() => {
    let self = {};

    let userModel = null;
    let Token = null;
    let messageConfig = null;

    self.init = (model, token, message) => {
        userModel = model;
        Token = token;
        messageConfig = message;
    }

    self.run = async(email, password) => {
        const {undefinedMessage} = messageConfig;

        if ([email, password].includes(undefined))
            throw Error(undefinedMessage);

        const findedUser = await userModel.checkPassword(email, password);
        const {userId} = findedUser;
        const token = await Token.asyncSign({userId});

        return {
            token,
            userId
        };
    }

    return self;
})();

module.exports = LoginService;