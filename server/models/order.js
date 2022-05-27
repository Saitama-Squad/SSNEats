const mongoose = require('mongoose');


const Item = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true
    },

    vegetarian: {
        type: Boolean,
        required: true
    },

    count: {
        type: Number,
        required: true
    }
});

const OrderSchema = new mongoose.Schema({
    items: [Item],
    orderno: {
        type: Number,
        required: true
    },
    delivered: {
        type: Boolean,
        required: true
    },
    ordertime: {
        type: Date,
        required: true
    }
});

const OrderModel = mongoose.model("orders", OrderSchema)
module.exports = OrderModel;