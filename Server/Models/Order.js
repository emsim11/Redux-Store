const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    PurchaseDate: {
        type: Date,
        default: Date.now,
    },
    Products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

const Order = model('Order', OrderSchema);

module.exports = Order