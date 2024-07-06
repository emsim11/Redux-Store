const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
});

const Category = model('Category', CategorySchema);

module.exports = Category