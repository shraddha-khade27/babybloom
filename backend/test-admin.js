require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/admin');
const bcrypt = require('bcryptjs');

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/babybloom');
        console.log("Connected to DB:", process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/babybloom');
        const admin = await Admin.findOne({ email: 'admin@babybloom.com' });
        console.log("Admin object:", admin);
        if (admin) {
            const isMatch = await bcrypt.compare('admin123', admin.password);
            console.log("Match:", isMatch);
        }
    } catch (e) {
        console.error("ERROR CAUGHT", e);
    } finally {
        await mongoose.disconnect();
    }
}
test();
