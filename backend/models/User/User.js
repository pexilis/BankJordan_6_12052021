const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const {v4: uuidv4} = require("uuid");
const UserUtils = require("./User.utils");
const {regexPassword} = require("../../config/regex.config");

const {emailMessage, passwordMessage} = require("../../config/message.config");

const {Schema, model} = mongoose;

const userSchema = new Schema({
    userId: {
        type: String,
        unique:true,
        immutable:true,
        default: id => uuidv4()
    },
    email:{
        type: String,
        required:[true, emailMessage.required],
        unique:true, 
    },
    password:{
        type: String,
        required:true,
        minLength:[12, passwordMessage.min],
        maxLength:[256, passwordMessage.max],
        match:[regexPassword, passwordMessage.format]
    }
});

userSchema.pre("save", UserUtils.hashBeforeSave)
userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator'});
userSchema.statics.checkPassword = UserUtils.checkPassword;

const userModel = model('User', userSchema);

module.exports = userModel;