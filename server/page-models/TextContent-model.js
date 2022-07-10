const {Schema, model} = require('mongoose')

const textContentSchema = new Schema({
    originalText: {type: JSON},
    originalLanguageId: {type: Number, default: 1}
})

module.exports = model("TextContent", textContentSchema)