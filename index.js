const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');
const codeRoutes = require('./routes/CodeRoutes.js')
const authRoute = require('./routes/authRoutes.js')
const productRoute =  require('./routes/productRoute.js')
const bidRoute = require('./routes/BidRoutes.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(bodyParser.json());
const FRONTEND = process.env.FRONTEND_URL

app.use(cors({
    origin: FRONTEND,
    credentials: true,
    secure:false
  }));
  
// Connect to MongoDB
require("dotenv").config({ path: ".env" });
app.use(cookieParser())
const Connections = async  () => {
const DATABASE = process.env.DATABASE_URI
    try{
      
    await  mongoose.connect(DATABASE).then(
        console.log("database connected")
    )


    } catch (err) {
        console.log("error while loding database",err)
    }

}

Connections()

// Routes

 app.use('/transactions', transactionRoutes);

app.use('/auth',authRoute)

app.use('/product',productRoute)

app.use('/code',codeRoutes)

app.use('/bid',bidRoute)

const PORT = process.env.BACKEND||4000;
app.listen(PORT,()=>{
    console.log("server is running ON",PORT)
})
