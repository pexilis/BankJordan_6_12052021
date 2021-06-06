const User = (() => {
    let self = {};
    let UserUtils = require("./User.utils");

    /* NPM dependencies */
    let mongoose = null;
    let uniqueValidator = null;
    let uuidv4 = null;

    /*  */
    let Schema = null;
    let model = null;

    /* Config Dep */
    let regexConfig = null; 
    let messageConfig = null;
    
    self.initDep = (mongooseDep, uniqueDep, uuidDep) => {
        mongoose = mongooseDep;
        uniqueValidator = uniqueDep;
        uuidv4 = uuidDep;

        Schema = mongoose.Schema;
        model = mongoose.model;
    }

    self.initConfig = (regex, message) => {
        regexConfig = regex;
        messageConfig = message;
    }

    self.init = () => {
        const {emailMessage, passwordMessage} = messageConfig;
        const {regexPassword} = regexConfig;

        const userSchema = new Schema({
            userId: {
                type: String,
                unique:true,
                immutable:true,
                default: id => uuidv4()
            },
            email:{
                type: String,
                required:true,
                unique:true, 
            },
            password:{
                type: String,
                required:true,
            }
        });

        userSchema.pre("save", UserUtils.hashBeforeSave)
        userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator'});
        userSchema.statics.checkPassword = UserUtils.checkPassword;
        const userModel = model('User', userSchema);

        return {userModel, userSchema};
    }

    return self;
})();

module.exports = User;
