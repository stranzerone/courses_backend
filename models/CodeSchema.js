const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the uploaded code
const CodeSchema = new Schema({
 user:{
    type: String,
    required: true,
 },

codeId:{
type: String,
required: true,
},
  jsxCode: {
    type: String,
    required: true,
  },
  cssCode: {
    type: String,
  },
  codeType: {
    type: String,
    enum: ['button', 'navbar', 'animations', 'forms', 'loaders'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl:{
    type:String,
    require:true
  },
  price:{
    type:Number,
    require:true
  },
  adminStatus:{
type:String,
enum:['accepted','rejected','pending'],
default:'pending'
  }
});

// Create a model from the schema
const CodeModel = mongoose.model('Code', CodeSchema);

module.exports = CodeModel;
