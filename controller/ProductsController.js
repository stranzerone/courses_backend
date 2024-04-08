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
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all products
exports.allProducts=  async (req, res) => {
    try {
        const products = await Product.find();
        const user = req.user
       
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

        const updatedProduct = await Product.updateOne({ productId : id }, newData);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};




exports.addProduct = async (req, res) => {
    try {
        const productId = generateRandomNumber()
       const { title, description, seller, price,image } = req.body;
        const newProduct = new Product({ title, description, seller, price,image:req.body.images,productId });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.myProducts = async (req, res) => {

    try {

        const user = req.user
        const response = await Transaction.find({userId:user.userId})
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.deleteProduct = async (req, res) => {

    try {

const {id}  = req.params
     const response = await Product.findOneAndDelete({productId:id})
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};





exports.addImagesToCloud = async(req,res)=>{


    try {

        console.log(req.body)
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/ddtbimcoe/image/upload',);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error uploading to Cloudinary' });
    }



}