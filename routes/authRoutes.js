const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');
const { authenticateToken } = require('../middleware/authmiddleware.js');

router.get('/verify',authenticateToken,authController.verifyUser)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/type',authenticateToken,authController.type)
router.get('/findUser',authenticateToken,authController.finduser)
router.post('/findRefral',authenticateToken,authController.refralCode)
router.get('/allUsers',authController.allUsers)
router.put('/addImage/:username',authController.addImage)
router.put('/update',authenticateToken,authController.updateUser)
router.delete('/logout',authenticateToken,authController.logoutController)


module.exports = router;
