// controllers/bidController.js
const Bid = require('../models/BidsSchema.js');

// Create a new bid
exports.createBid = async (req, res) => {
  try {
    
    const username = req.user.userId
    const {  imageUrl, budget,description,completionDate } = req.body;

    const newBid = new Bid({
      username,
      imageUrl,
      budget,
      completionDate,
      description
    });

    const savedBid = await newBid.save();
   
    res.status(201).json({ success: true, data: savedBid });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
};

// Get all bids
exports.getAllBids = async (req, res) => {
  try {
    let bids;
   
    if(req.user.user == 'admin'){

     bids = await Bid.find();
    }else if(req.user.user == 'user'){
      bids = await Bid.find({AdminStatus:'accepted',UserStatus:'accepted'});
    }
    res.status(200).json({ success: true, data: bids });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getBidsOfUser = async (req, res) => {
    try {
      const username = req.user.userId
      const bids = await Bid.find({username});
      res.status(200).json({ success: true, data: bids });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Get a bid by ID
exports.getBidById = async (req, res) => {
  try {
    const {id} = req.params
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ success: false, message: 'Bid not found' });
    }
    res.status(200).json({ success: true, data: bid });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a bid by ID
exports.updateBid = async (req, res) => {
  const { id } = req.params;
  const username = req.user;
  const { userStatus, description, budget, completionDate,adminStatus } = req.body;
  try {
    // Find the bid by ID
    const bid = await Bid.findById(id);
    
    if (!bid) {
      return res.status(404).json({ success: false, message: 'Bid not found' });
    }

    // Check if the username matches or if the user is an admin
    if (bid.username === username.userId || username.user === "admin") {
      const updatedBid = await Bid.findByIdAndUpdate(id, {
        UserStatus: userStatus,
        description: description,
        budget: budget,
        completionDate: completionDate,
        AdminStatus:adminStatus
      }, { new: true }); // `new: true` returns the updated document

      // Respond with the updated bid
      return res.status(200).json({ success: true, data: updatedBid });
    }

    // If the user is not authorized
    return res.status(403).json({ success: false, message: 'Unauthorized to update this bid' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a bid by ID
exports.deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    if (!bid) {
      return res.status(404).json({ success: false, message: 'Bid not found' });
    }
    res.status(200).json({ success: true, message: 'Bid deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
