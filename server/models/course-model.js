const {Schema, model} = require('mongoose')

const courseSchema = new Schema({
    title: {type: String},
    language: {type: String},
    isPublic: {type: Boolean, default: false},
    image: {type: String},
    category: {type: String},
    cost: {type: Number},
    info: {type: String},
    requirements: {type: String}
})

module.exports = model("Course", courseSchema)