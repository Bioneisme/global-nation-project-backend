const {Schema, model} = require('mongoose')

const courseSchema = new Schema({
    title: {type: String, unique: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    language: {type: String},
    poster: {type: String},
    category: {type: String},
    cost: {type: Number},
    difficulty: {type: String},
    teaches: {type: String},
    requirements: {type: String},
    shortly: {type: String},
    status: {type: String},
    rates: [{type: Schema.Types.ObjectId, ref: 'Rate'}],
    avgRate: {type: Number},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    isPublic: {type: Boolean, default: false},
})

module.exports = model("Course", courseSchema)