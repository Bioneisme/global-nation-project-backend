const {Schema, model} = require('mongoose')

const homeSchema = new Schema({
    content: {type: Schema.Types.ObjectId, ref: 'TextContent'},
    jsonContent: {type: Schema.Types.ObjectId, ref: 'TextContent'}
})

module.exports = model("Home", homeSchema)