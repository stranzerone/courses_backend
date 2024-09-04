const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authmiddleware.js');
const { allProducts, addProduct, productById, updatedProduct, myProducts, deleteProduct, addImagesToCloud } = require('../controller/ProductsController.js');

router.get('/allProducts/all',authenticateToken,allProducts)

router.post('/addProduct',authenticateToken,addProduct );
router.get('/productById/:id', authenticateToken,productById);
router.put('/updateProduct/:id',authenticateToken,updatedProduct);
//users products
router.get('/allProducts/user',authenticateToken,myProducts);
router.delete('/deleteProduct/:id',authenticateToken,deleteProduct);
router.post('/addProductImages',authenticateToken,addImagesToCloud );

module.exports = router;
