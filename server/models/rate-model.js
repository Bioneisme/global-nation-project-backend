const {Schema, model} = require('mongoose')

const rateSchema = new Schema({
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rate: {type: Number}
})

module.exports = model("Rate", rateSchema)