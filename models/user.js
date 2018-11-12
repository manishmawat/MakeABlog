const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type: String, unique :true, required: true},
    password: {type:String, required:true}
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
}

const User = mongoose.model('user',userSchema);

function validateUser(message){
    const userJoiSchema = {
        name : Joi.string().min(3).max(20).required(),
        email:Joi.string().email().required(),
        password: Joi.string().required()
    }
    return Joi.validate(message, userJoiSchema);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validateUser = validateUser;