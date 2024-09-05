const Transaction = require('../models/Transcation.js');
const axios = require('axios'); // Import axios
require("dotenv").config({ path: ".env" });




exports.getTransactionSummary = async (req, res) => {
  const { timePeriod } = req.params;

  // Get the current date
  const currentDate = new Date();
  
  // Define the start and end dates based on the time period
  let startDate, endDate;
  if (timePeriod === 'today') {
    startDate = new Date(currentDate.setHours(0, 0, 0, 0));
    endDate = new Date(currentDate.setHours(23, 59, 59, 999));
  } else if (timePeriod === 'week') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of current week (Sunday)
    startDate = new Date(startOfWeek.setHours(0, 0, 0, 0));
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // End of current week (Saturday)
    endDate = new Date(endOfWeek.setHours(23, 59, 59, 999));
  } else if (timePeriod === 'month') {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of current month
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of current month
    endDate.setHours(23, 59, 59, 999);
  } else if (timePeriod === 'year') {
    startDate = new Date(currentDate.getFullYear(), 0, 1); // Start of current year
    endDate = new Date(currentDate.getFullYear(), 11, 31); // End of current year
    endDate.setHours(23, 59, 59, 999);
  } else if (timePeriod === 'all') {
    startDate = new Date(0);
  
    // Set endDate to the current date
    endDate = new Date();
}
  
  // Query transactions based on the time period
  let query = {
    date: { $gte: startDate, $lte: endDate }
  };

  try {
    const transactions = await Transaction.find(query);

    // Calculate the sum of prices
    const sumOfPrices = transactions.reduce((total, transaction) => {
      return total + transaction.price;
    }, 0);


    res.json({ sumOfPrices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};













const Razorpay = require('razorpay');

const SECRETID= process.env.SECRET_ID
const SECRET_KEY= process.env.SECRET_KEY

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: SECRETID,
    key_secret: SECRET_KEY
});

//rzp_live_mF0PwzxnLR4axK,qrOoYOOxQtTCIJm0xEGNLAtG
// Route to initiate payment and generate order ID



exports.verifyUpi = async (req, res) => {
  const { upiId } = req.body;

  console.log(upiId, "Received UPI ID");

  if (!upiId) {
    return res.status(400).json({ error: 'UPI ID is required' });
  }

  try {
    const response = await axios.post('https://api.razorpay.com/v1/payments/validate/vpa', 
      { upi_id: upiId }, // Data to send
      {
        auth: {
          username: SECRETID,
          password: SECRET_KEY
        }
      }
    );
    // Example API call - replace with the actual Razorpay endpoint if available
    // const response = await axios({
    //   method: 'POST',
    //   url: 'https://api.razorpay.com/v1/payments/validate/vpa', // Update with the correct endpoint
    //   auth: {
    //     username: SECRETID,
    //     password: SECRET_KEY
    //   },
   
    //   data: {
    //     upi_id: upiId
    //   }
    // });

    console.log(response.data, "Razorpay API Response");

    if (response.status === 200) {
      return res.status(200).json({ success: true, message: 'UPI ID verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'UPI ID verification failed' });
    }
  } catch (error) {
    console.error('Error verifying UPI ID:', error.response ? error.response.data : error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};














exports.initate = async (req, res) => {
    try {

      price = req.body.price
        const orderOptions = {
            amount: price *100, // Amount in paisa (example: 1000 paisa = ₹10)
            currency: 'INR',
            receipt: 'receipt#1',
            payment_capture: 1 // Auto-capture payment after order creation
        };

        // Create Razorpay order
        const order = await razorpay.orders.create(orderOptions);
        res.json({ orderId: order.id });
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const PASSKEY = process.env.PASSKEY
const MAIL = process.env.GMAIL
const nodemailer = require('nodemailer');
const { isErrored } = require('nodemailer/lib/xoauth2/index.js');
// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL,
        pass: PASSKEY
    }
});

// Endpoint to send receipt email
exports.sendRecepit =  async (req, res) => {

  const user = req.user



    // Generate receipt HTML content (you can use a template engine like EJS)
    const receiptHTML = `
        <h1>Receipt for Your Payment</h1>
        <p>Payment Details: You have successfully made a payment For the product From Codecells</p>
        <!-- Include more payment details here -->
    `;

    // Email options
  

    try {

      
        // Send email
       
        const mailOptions = {
          from: MAIL,
          to:user.email,
          subject: 'Receipt for Your Payment',
          html: receiptHTML
      };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Receipt sent successfully' });
    } catch (error) {
        console.error('Error sending receipt email:', error);
        res.status(500).json({ message: 'Error sending receipt email' });
    }
};







 exports.paymentSuccessHandle = async(req,res)=>{
try{
const data =req.body
const user = req.user
const price = data.price
const refral  = data.refral
const today = new Date().toISOString().split('T')[0];


const transaction = new Transaction({ userId:user.userId,ProductId:data.id,transactionId:data.response.razorpay_payment_id,signature:data.response.razorpay_signature,date:today,price:price,refralCode:refral,category:data.category });

await transaction.save()
res.status(200).json("added transaction")

}catch(error){
  res.status(500).json(error)
}

}








exports.myUsedRefrals = async(req,res)=>{
  const refral  = req.params.refral
  try{

  
const response = await Transaction.find({refralCode:refral})  

  res.status(200).json(response.length)
  
  }catch(error){
    res.status(500).json(error)
  }
  
  }





exports.allTransactions = async(req,res) =>{


try{

  const allTransactions = await Transaction.find({})

  res.status(200).json(allTransactions)


}catch(error){
  res.status(500).json(error)
}

}


exports.usersTransactions = async(req,res) =>{


  try{

    const user = req.user
    const {ProductId} = req.params
    const allTransactions = await Transaction.find({userId:user.userId,ProductId:ProductId})
    console.log(allTransactions.length,ProductId,user,"my all transactions")
    if(allTransactions.length >0){
    res.status(200).json({success:true,message:"purchased successfully"})
    }else{
      res.status(200).json({success:false,message:"purchased successfully"})

    }
  
  }catch(error){
    console.error(error)
    res.status(500).json({success:false,message:"some thing is wrong"})
  }
  
  }


  
exports.usersAllTransactions = async(req,res) =>{


  try{

    const user = req.user
    const {category} = req.params
    const allTransactionsCategory = await Transaction.find({userId:user.userId,category:category})
 
    console.log("My transactions of ",allTransactionsCategory,category)
   
    res.status(200).json({success:true,message:"purchased successfully",data:allTransactionsCategory})

    
  
  }catch(error){
    console.error(error)
    res.status(500).json({success:false,message:"some thing is wrong"})
  }
  
  }