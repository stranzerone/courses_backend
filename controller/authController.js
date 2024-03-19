const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

exports.register = async (req, res) => {
  const { username, email, password,fName,lName } = req.body;


  const generateReferralCode = (length) => {
    return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
  };

  const refralCode = generateReferralCode(8)


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword,type:"user",fName,lName,refralCode:refralCode });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
  
    const user = await User.findOne({ email });
    if (!user) return res.status(202).json({ message: 'Invalid email ' });

    const validPassword =  bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(203).json({ message: 'Invalid  password' });

    const accessToken = jwt.sign({ userId: user._id,user:user.type }, "sahil");
 

    if(user && validPassword && accessToken){
      res.status(200).json({ accessToken,type:user.type });


    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.type = async(req,res)=>{

try{

const type = req.user
res.status(200).json(type)

}catch(error){

  console.error(error)
}

}






exports.finduser = async (req, res) => {


  try {
    const user = req.user
    const id = user.userId
    const   foundUser = await User.findOne({_id:id})
    

    res.status(200).json({foundUser});
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};



exports.refralCode = async (req, res) => {


  try {
   
   const {refralCode} = req.body
    const   foundUser = await User.findOne({refralCode})
    
if(foundUser){
    res.status(200).json("refral code Valid");
}else{
  res.status(205).json("refral code Valid");
}
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.allUsers = async (req, res) => {


  try {
   
    const   foundUser = await User.find({})

    res.status(200).json(foundUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};