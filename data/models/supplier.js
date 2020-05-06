let mongoose = require('mongoose')

let supplierSchema = new mongoose.Schema({
    Id: Int16Array,
    Name: String
})

module.exports = mongoose.model('Supplier', supplierSchema)