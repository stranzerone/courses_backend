const express = require('express');
const router = express.Router();
const CodeController = require('../controller/codeController.js'); // Adjust the path to your controller file
const { authenticateToken } = require('../middleware/authmiddleware.js');

// Route to get all code documents
router.get('/codes/all',authenticateToken, CodeController.getAllCodes);


// Route to get  code ById
router.get('/component/:codeId',authenticateToken, CodeController.getComponentById);


//ROute to add code
router.post('/addComponent',authenticateToken, CodeController.addCode);

// Route to get code by username
router.get('/codes/user',authenticateToken, CodeController.getCodeByUsername);

// Route to get code by component name
router.get('/componentByName/:componentName',authenticateToken, CodeController.getCodeByComponentName);

// Route to update code by component ID
router.put('/:id',authenticateToken, CodeController.updateCodeById);

module.exports = router;
