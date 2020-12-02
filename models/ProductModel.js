// Import the mongoose library
const mongoose = require('mongoose');

// Create a schema
const ProductSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    }
);

// Create a model
const ProductModel = mongoose.model('products', ProductSchema);

// Export the model
module.exports = ProductModel;