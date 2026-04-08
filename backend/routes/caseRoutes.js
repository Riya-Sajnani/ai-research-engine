const express = require('express');
const router = express.Router();
const { uploadCase } = require('../controllers/caseController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('pdf'), uploadCase);

module.exports = router;