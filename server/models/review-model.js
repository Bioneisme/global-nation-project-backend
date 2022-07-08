const {Schema, model} = require('mongoose')

const reviewSchema = new Schema({
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    comment: {type: String, trim: true, required: true}
})

module.exports = model("Review", reviewSchema)