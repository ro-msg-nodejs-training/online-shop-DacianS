let mongoose = require('mongoose');
let CategorySchema = require('./category');
let SupplierSchema = require('./supplier');

let productSchema = new mongoose.Schema({
    Id: Int16Array,
    Name: String,
    Description: Number,
    Price: Number,
    Weight: Number,
    Category: CategorySchema.Id,
    Supplier: SupplierSchema.Id,
    ImageUrl: String
})

module.exports = mongoose.model('Product', productSchema)