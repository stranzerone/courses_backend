const Product = require('../models/ProductScema.js');
const Transaction = require('../models/Transcation.js');


const generateRandomNumber = () => {
    // Generate a random number between 100000 and 999999
    return Math.floor(Math.random() * 900000) + 100000;
};


// Get product by ID
 exports.productById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({productId:id});
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all products
exports.allProducts=  async (req, res) => {
    try {
        let products

        if(req.user.user == 'admin'){
         products = await Product.find();
        }else if(req.user.user =='user'){
            products = await Product.find({adminStatus:'accepted'});

        }
       
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update product
exports.updatedProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const username = req.user.userId;

        // Find the product by productId
        const product = await Product.findOne({ productId: id });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if the username matches or if the user is an admin
        if (product.username === username || req.user.user === "admin") {
            // Update the product if authorized
            await Product.updateOne({ productId: id }, newData);
            return res.status(200).json({ success: true, message: 'Product updated successfully' });
        }

        // If the user is not authorized
        return res.status(403).json({ success: false, message: 'Unauthorized to update this product' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};




exports.addProduct = async (req, res) => {
    try {
      
    
        const productId = generateRandomNumber()
        const formattedDate = new Date().toISOString().split('T')[0];
        const username = req.user.userId
       const { title, description, seller, price,productLink,deployedLink,githubLink } = req.body;
        const newProduct = new Product({ title, description, seller, price,image:req.body.images,productId,createdDate:formattedDate,productLink,deployedLink,username,githubLink });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.myProducts = async (req, res) => {

    try {

        const user = req.user
        const response = await Transaction.find({userId:user.userId})
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};













exports.addImagesToCloud = async (req, res) => {
    try {
        // Assuming the image file is being sent as part of the request body
        const { file } = req.body;

        // Create a new FormData instance
        const formData = new FormData();
        formData.append('file', file); // Append the image file to the formData
        formData.append('upload_preset', 'h6faps0i'); // Use your Cloudinary upload preset

        // Make a POST request to Cloudinary
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/ddtbimcoe/image/upload', formData, {
            headers: formData.getHeaders(), // Set headers for multipart/form-data
        });

        // Send back the response data from Cloudinary
        res.json(data);
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error uploading to Cloudinary' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const username = req.user;
  
      // Find the product by ID
      const product = await Product.findOne({ productId: id });
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Check if the username matches
      if (product.username === username.userId || username.user == "admin") {
        // If the user is authorized, delete the product
        await Product.findOneAndDelete({ productId: id });
        return res.status(200).json({ success: true, message: 'Product deleted' });
      }
  
      // If the user is not authorized
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this product' });
  
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting the product' });
    }
  };
  