const express = require('express');
const router = express.Router();
const {authenticateToken, authenticateTokenAdmin} = require('../middleware/authmiddleware.js');
const { allProducts, addProduct, productById, updatedProduct, myProducts, deleteProduct, addImagesToCloud } = require('../controller/ProductsController.js');

router.get('/allProducts',authenticateToken,allProducts)
router.post('/addProduct',authenticateTokenAdmin,addProduct );
router.get('/productById/:id', authenticateToken,productById);
router.put('/updateProduct/:id',authenticateTokenAdmin,updatedProduct);
router.get('/myPoducts',authenticateToken,myProducts);
router.delete('/deleteProduct/:id',authenticateTokenAdmin,deleteProduct);
router.post('/addProductImages',authenticateTokenAdmin,addImagesToCloud );
router.delete('/deleteProduct/:id',authenticateTokenAdmin,deleteProduct );

module.exports = router;
