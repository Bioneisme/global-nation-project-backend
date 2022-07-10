const {Schema, model} = require('mongoose')

const languageSchema = new Schema({
    languageId: {type: Number},
    languageName: {type: String}
})

module.exports = model("Language", languageSchema)