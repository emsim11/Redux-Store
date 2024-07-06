const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    Description: {
        type: String,
    },
    Image: {
        type: String,
    },
    Price: {
        type: Number,
        required: true,
        min: 0.99,
    },
    Quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
});

const Product = model('Product', ProductSchema);

module.exports = Product