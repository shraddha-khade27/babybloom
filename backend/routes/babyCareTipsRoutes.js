const express = require('express');
const router = express.Router();
const BabyCareTip = require('../models/BabyCareTip');
const { protect, admin: adminProtect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads/tips/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, 'tip-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// PUBLIC - Get all visible tips
router.get('/', async (req, res) => {
    try {
        const tips = await BabyCareTip.find({ isVisible: true }).sort({ createdAt: -1 });
        res.json(tips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUBLIC - Get single tip
router.get('/:id', async (req, res) => {
    try {
        const tip = await BabyCareTip.findById(req.params.id);
        if (!tip) return res.status(404).json({ message: 'Tip not found' });
        res.json(tip);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN - Get all tips
router.get('/admin/all', protect, adminProtect, async (req, res) => {
    try {
        const tips = await BabyCareTip.find().sort({ createdAt: -1 });
        res.json(tips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN - Create tip
router.post('/', protect, adminProtect, upload.single('image'), async (req, res) => {
    try {
        const { title, content, category, isVisible } = req.body;
        const image = req.file ? '/uploads/tips/' + req.file.filename : '';
        const tip = new BabyCareTip({ title, content, category, image, isVisible: isVisible === 'true' || isVisible === true });
        await tip.save();
        res.status(201).json(tip);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN - Update tip
router.put('/:id', protect, adminProtect, upload.single('image'), async (req, res) => {
    try {
        const { title, content, category, isVisible } = req.body;
        const tip = await BabyCareTip.findById(req.params.id);
        if (!tip) return res.status(404).json({ message: 'Tip not found' });
        
        tip.title = title || tip.title;
        tip.content = content || tip.content;
        tip.category = category || tip.category;
        if (isVisible !== undefined) {
            tip.isVisible = isVisible === 'true' || isVisible === true;
        }
        
        if (req.file) tip.image = '/uploads/tips/' + req.file.filename;
        
        await tip.save();
        res.json(tip);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADMIN - Delete tip
router.delete('/:id', protect, adminProtect, async (req, res) => {
    try {
        await BabyCareTip.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tip deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
