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
referralCode:{
  type:String,
  require:true
},
image:{
  type:String,
},
upi:{
  type:String
},
verification:{
  type:String,
  enum:["pending","accepted","rejected"],
  default:"pending"
},
location:{
  type:String
},
earnings:{
  type:String,
  default:"0"
}


});

module.exports = mongoose.model('User', userSchema);
