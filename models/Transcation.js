const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type:String,
    require:true
  },
  transactionId:{
   type:String,required:true
  },
  ProductId: {
    type:String,
    required:true
  },
 signature:{
  type:String,required:true
},

 category: {
  type: String,
  enum: ["component", "project", "bid"],
  required: true
},
  price:{
    type:Number,
    require:true
  },
  refralCode:{
    type:String
  },
  date: Date
},
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;



