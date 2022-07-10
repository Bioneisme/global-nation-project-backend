const {Schema, model} = require('mongoose')

const translationSchema = new Schema({
    textContent: {type: Schema.Types.ObjectId, ref: 'TextContent'},
    languageId: {type: Number},
    translation: {type: JSON}
})

module.exports = model("Translation", translationSchema)