const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const capitalize = require("../../utils/capitalize");
require("dotenv").config();

const RegexConfig = require("../../config/regex.config");
const SauceUtils = require("./Sauce.utils");


const{
    HOSTNAME,
    PORT,
    PROTOCOL
} = process.env;

const{
    uuidv4Regex,
    alphaRegex,
    fileRegex
} = RegexConfig;

const SauceSchema = new Schema({
    userId: {
        type: String,
        required:true,
        immutable:true,
        match:uuidv4Regex
    },
    name: {
        type:String,
        required:true,
        minLength:4,
        maxLength:30,
        lowercase:true,
        get:value => capitalize(value)
    },
    manufacturer:{
        type:String,
        required:true,
        minLength:4,
        maxLength:30,
        lowercase:true,
        get:value => capitalize(value)
    },
    description:{
        type:String,
        required:true,
        minLength:10,
        maxLength:280,
    },
    mainPepper:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
        lowercase:true,
        get:value => capitalize(value)
    },
    imageUrl:{
        type:String,
        required:true,
        lowercase:true,
        match:fileRegex,
        set:image => `${PROTOCOL}://${HOSTNAME}:${PORT}/public/images/${image}` 
    },
    heat:{
        type: Number,
        required:true,
        min:1,
        max:10
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

SauceSchema.statics.canAccess = SauceUtils.canAccess; 
SauceSchema.statics.likeSauce = SauceUtils.likeSauce; 

const SauceModel = model('Sauce', SauceSchema);
module.exports = SauceModel;