const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{type: String,require:true},
  email:{type: String, require:true},
  password: {type:String,require:true},
type:{
  type:String,
  enum:["admin","user"],
  default:"user"
},

fName:{
  type:String,
  require:true
}
,

lName:{
  type:String,
  require:true
},
refralCode:{
  type:String,
  require:true
},


});

module.exports = mongoose.model('User', userSchema);
