const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactioncontroller.js');
const { authenticateToken, authenticateTokenAdmin } = require('../middleware/authmiddleware.js');




//router.get('/order',authenticateToken,transactionController.Order)
router.get('/summary/:timePeriod', authenticateTokenAdmin, transactionController.getTransactionSummary);
router.post('/initate', authenticateToken,transactionController.initate);
router.post('/sendRecepit',authenticateToken,transactionController.sendRecepit);
router.post('/paymentSuccess', authenticateToken,transactionController.paymentSuccessHandle);
router.get('/allTransactions', authenticateTokenAdmin,transactionController.allTransactions);
router.get('/usedRefral/:refral', authenticateToken,transactionController.myUsedRefrals);
router.get("/userTransactions",authenticateToken,transactionController.usersTransactions)

module.exports = router;
