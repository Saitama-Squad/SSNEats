const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
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
    }
});

const MenuModel = mongoose.model("menus", MenuSchema)
module.exports = MenuModel;