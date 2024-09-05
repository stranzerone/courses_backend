const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');


exports.register = async (req, res) => {
  const { username, email, password, fName, lName,image } = req.body;

  // Validate input data
  if (!username || !email || !password || !fName || !lName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const generateReferralCode = (length) => {
    return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
  };

  const referralCode = generateReferralCode(8);

  try {
    // Check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(209).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      type: 'user',
      fName,
      lName,
      referralCode,
      image
    });

    // Save the user to the database
    await user.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully', username });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};






exports.addImage = async (req, res) => {
 const {username} =req.params
const {avatarURL, location} = req.body
  try {
  
    const user = await User.findOneAndUpdate({username:username },{image:avatarURL,location});
   if(user){
    res.status(200).json("added Image")
   }  


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};













exports.login = async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(202).json({ message: 'Invalid email' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(203).json({ message: 'Invalid password' });
    const accessToken = jwt.sign({ userId: user.username, user: user.type,email:user.email }, "sahil", { expiresIn: '1h' });

    // Save JWT token in a cookie
    res.cookie('accessToken', accessToken, {
      maxAge: 9000000,
    httpOnly: true,


    // sameSite: 'Lax',
    sameSite: 'None',
    secure: true
    });


    res.status(200).json({ accessToken, type: user.type });

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
    const   foundUser = await User.findOne({username:id})
    

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
  res.status(205).json("refral code InValid");
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


// Update UPI or Verification for a user or admin
exports.updateUser = async (req, res) => {
  const token = req.user;

  try {

    // Check if the user is a regular user
    if (token.user === 'user') {
      const { upi, verification } = req.body;

      if (!upi) {
        return res.status(400).json({ message: 'UPI ID is required' });
      }

      // UPI validation (if required)
      // Example UPI validation (optional)
      // const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      // if (!upiRegex.test(upi)) {
      //   return res.status(400).json({ message: 'Invalid UPI format' });
      // }

      // Find and update user UPI
      const user = await User.findOne({ username: token.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user UPI and verification status
      user.upi = upi;
      user.verification = verification;
      await user.save();

      return res.status(200).json({ message: 'UPI ID updated successfully', upi: user.upi });
    } 
    
    // Check if the user is an admin
    else if (token.user === 'admin') {
      const { username, verification } = req.body;

      if (!username || !verification) {
        return res.status(400).json({ message: 'Username and verification status are required' });
      }

      
      // Find and update verification status for another user
      const user = await User.findOneAndUpdate(
        { username: username },
        { verification: verification },
        { new: true } // Returns the updated user document
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User verification updated', user });
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
