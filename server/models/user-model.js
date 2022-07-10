const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, required: true, unique: true},
    nickname: {type: String, unique: true},
    password: {type: String},
    image: {type: String},
    googleId: {type: String},
    facebookId: {type: String},
    isActivated: {type: Boolean, default: false},
    activationCode: {type: Number},
    resetCode: {type: Number},
    roles: {type: []},
})

module.exports = model("User", userSchema)