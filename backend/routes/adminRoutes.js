const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const { protect, admin: adminMiddleware } = require('../middleware/authMiddleware');

// ADMIN LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const token = jwt.sign(
            { id: admin._id, role: 'admin' },
            process.env.JWT_SECRET || 'babybloom_secret',
            { expiresIn: '1d' }
        );

        res.json({ token, admin: { email: admin.email, role: 'admin' } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
router.get('/dashboard-stats', protect, adminMiddleware, async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({});
        const totalOrders = await Order.countDocuments({});
        const totalCustomers = await User.countDocuments({ role: { $ne: 'admin' } });

        // Calculate total revenue from orders
        const orders = await Order.find({ paymentStatus: { $ne: 'FAILED' } });
        const totalRevenue = orders.reduce((acc, order) => acc + (order.amount || order.totalPrice || 0), 0);

        // Get 5 most recent orders for activity feed
        const recentOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name');

        const recentActivity = recentOrders.map(order => ({
            id: order._id,
            type: 'order',
            message: `New order placed by ${order.user?.name || 'Guest'} for ₹${order.amount || order.totalPrice || 0}`,
            time: order.createdAt
        }));

        res.json({
            totalProducts,
            totalOrders,
            totalCustomers,
            totalRevenue,
            recentActivity
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: 'Server Error fetching stats' });
    }
});
router.post('/seed', async (req, res) => {
    try {
        const { email, password } = req.body;

        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = new Admin({
            email,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: 'Admin seeded successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
