// routes/bidRoutes.js
const express = require('express');
const router = express.Router();
const bidController = require('../controller/BidController.js');
const { authenticateToken } = require('../middleware/authmiddleware.js');

// Route to create a new bid
router.post('/bids',authenticateToken, bidController.createBid);

// Route to get all bids
router.get('/bids/all', authenticateToken, bidController.getAllBids);

// Route to get all byUsername
router.get('/bids/user',authenticateToken, bidController.getBidsOfUser);


// Route to get a bid by ID
router.get('/bids/:id',authenticateToken, bidController.getBidById);

// Route to update a bid by ID
router.put('/bids/:id',authenticateToken,bidController.updateBid);

// Route to delete a bid by ID
router.delete('/bids/:id',authenticateToken, bidController.deleteBid);

module.exports = router;
