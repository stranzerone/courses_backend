const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
      type: String,
        required: true
    },
    productId:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Number,
        enum: [0, 1], // Allowed values are 0 and 1
        default: 1, // Default value is 1
        required:true,
     
    },
    
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
