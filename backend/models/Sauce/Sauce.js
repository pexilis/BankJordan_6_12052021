const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const SauceSchema = new Schema({
    userId: {
        type: String,
        required:true,
        immutable:true
    },
    name: {
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    mainPepper:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true,
    },
    heat:{
        type: Number,
        required:true
    },
    likes:{
        type: Number,
        default:0,
    },
    dislike:{
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

const SauceModel = model('Sauce', SauceSchema);

module.exports = SauceModel;