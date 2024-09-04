const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{type: String,require:true,unique:true},
  email:{type: String, require:true,unique:true},
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
image:{
  type:String,
},
upi:{
  Type:String
},
location:{
  Type:String
}


});

module.exports = mongoose.model('User', userSchema);
