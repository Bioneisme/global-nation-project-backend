const {Schema, model} = require('mongoose')

const lessonSchema = new Schema({
    topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
    content: {type: String},
    order: {type: Number},
    task: {type: Schema.Types.ObjectId, ref: 'Task'},
    completed: {type: Boolean}
})

module.exports = model("Lesson", lessonSchema)