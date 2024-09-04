const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  UserStatus: {
    type: String,
    enum: ['waiting', 'open', 'close'],
    default: 'waiting',
  },
  AdminStatus: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },

  completionDate:{
    type:Date,
    require:true
  },
  bidPrices: [
    {
      price: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  description:{
    type:String
  },
  phonePay:{
    type:String
  }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
