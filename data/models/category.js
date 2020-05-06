let mongoose = require('mongoose')

let categorySchema = new mongoose.Schema({
    Name: String,
    Description: String
})

module.exports = mongoose.model('Category', categorySchema)