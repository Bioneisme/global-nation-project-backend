const {Schema, model} = require('mongoose')

const topicSchema = new Schema({
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    title: {type: String},
    content: {type: String},
    order: {type: Number}
})

module.exports = model("Topic", topicSchema)