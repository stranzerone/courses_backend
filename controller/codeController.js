const CodeModel = require('../models/CodeSchema.js'); // Adjust the path to your schema file

// Get all code documents
const getAllCodes = async (req, res) => {
  try {
    let codes;
    if(req.user.user=="user"){
      codes = await CodeModel.find({adminStatus:'accepted'});

    }else if(req.user.user=='admin'){
      codes = await CodeModel.find();
    }
    res.status(200).json({ success: true, data: codes }); 
   } catch (error) {
    res.status(500).json({ message: 'Error fetching codes' });
  }
};

//get component by Id

const getComponentById = async (req, res) => {
  try {

    const {codeId} =  req.params
    const codes = await CodeModel.findOne({codeId});
    res.status(200).json(codes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching codes' });
  }
};


// Get code by username (assuming you have a username field)
const getCodeByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const code = await CodeModel.findOne({ username });
    if (code) {
      res.status(200).json({ success: true, data: code });
    } else {
      res.status(404).json({ message: 'Code not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching code by username' });
  }
};

// Get code by component name
const getCodeByComponentName = async (req, res) => {
  const { componentName } = req.params;
  try {
    const codes = await CodeModel.find({ codeType: componentName,adminStatus:'accepted' });
    res.status(200).json(codes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching code by component name' });
  }
};

// Update code by component ID
const updateCodeById = async (req, res) => {
  const { id } = req.params;
  const { jsxCode, cssCode, codeType,price,adminStatus } = req.body;
  try {
    const updatedCode = await CodeModel.findByIdAndUpdate(
      id,
      { jsxCode, cssCode, codeType,price,adminStatus },
      { new: true }
    );
    if (updatedCode) {
      res.status(200).json(updatedCode);
    } else {
      res.status(404).json({ message: 'Code not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating code by ID' });
  }
};

// Function to generate a random unique string
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Add a new code document
const addCode = async (req, res) => {
  const {  jsxCode, cssCode, type,imageUrl,price } = req.body;
  try {
    const newCode = new CodeModel({ user:"sahil",codeId:generateRandomId(5), jsxCode, cssCode, codeType:type,imageUrl,price });
    const response = await newCode.save();
    res.status(201).json(newCode);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new code' });
  }
};

// Export the controller functions
module.exports = {
  getAllCodes,
  getCodeByUsername,
  getCodeByComponentName,
  updateCodeById,
  addCode,
  getComponentById
};
