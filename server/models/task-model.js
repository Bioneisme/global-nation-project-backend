const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
    lesson: {type: Schema.Types.ObjectId, ref: 'Lesson'},
    document: {type: String}
})

module.exports = model("Task", taskSchema)