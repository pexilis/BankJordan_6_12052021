const Sauce = (() => {
    let self = {};

    let mongoose = null;
    let Schema = null;
    let model = null;

    let regexConfig = null;
    const SauceUtils = require("./Sauce.utils");

    let hostname = null;
    let port = null;
    let protocol = null;

    self.initDeps = mongooseDep => {
        mongoose = mongooseDep;
        Schema = mongoose.Schema;
        model = mongoose.model;
    }

    self.initConfig = regex => {
        regexConfig = regex;
    }

    self.initParam = (hostnameParam, protocolParam, portParam) => {
        protocol = protocolParam;
        hostname = hostnameParam;
        port = portParam;
    } 

    self.init = () => {
        const{
            uuidv4Regex,
            alphaRegex,
            fileRegex
        } = regexConfig;
        
        const sauceSchema = new Schema({
            userId: {
                type: String,
                required:true,
                immutable:true,
            },
            name: {
                type:String,
                required:true,
            },
            manufacturer:{
                type:String,
                required:true,
            },
            description:{
                type:String,
                required:true,
            },
            mainPepper:{
                type:String,
                required:true,
            },
            imageUrl:{
                type:String,
                required:true,
                set:image => `${protocol}://${hostname}/images/${image}` 
            },
            heat:{
                type: Number,
                required:true
            },
            likes:{
                type: Number,
                default:0,
            },
            dislikes:{
                type: Number,
                default:0,
            },
            usersLiked:{
                type: [String],
                default:[]
            },
            usersDisliked:{
                type:[String],
                default:[]
            }
        });
        
        sauceSchema.statics.canAccess = SauceUtils.canAccess; 
        sauceSchema.statics.likeSauce = SauceUtils.likeSauce; 
        
        const sauceModel = model('Sauce', sauceSchema);

        return {sauceModel, sauceSchema};
    }

    return self;
})();

module.exports = Sauce;