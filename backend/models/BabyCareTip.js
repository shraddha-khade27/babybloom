const mongoose = require('mongoose');

const babyCareTipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Feeding', 'Sleep', 'Health', 'Development', 'Safety', 'Skincare'], required: true },
    image: { type: String },
    isVisible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('BabyCareTip', babyCareTipSchema);
