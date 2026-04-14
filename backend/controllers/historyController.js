const SearchHistory = require('../models/SearchHistory');

const getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHistory };