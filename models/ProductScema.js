const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    adminStatus:{
type:String,
enum:["pending","accepted","rejected"],
default:"pending"

    },
    githubLink:{
type:String,
require:true
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
      type: Array,
        required: true
    },
    productId:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum: ['accepted', 'rejected','pending'], // Allowed values are 0 and 1
        default: 'pending', // Default value is 1
        required:true,
     
    },
    productLink:{
        type:String,
        required:true,
        unique:true
     
    },
    createdDate:{
        type : Date,
        require:true,

    },
    deployedLink:{
        type : String,
        require:true,
        
    },
    username:{
        type:String,
        require:true
       
    },
    adminStatus:{
        type:String,
        enum:['accepted','pending','rejected'],
        default:'pending'
    }
    
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
