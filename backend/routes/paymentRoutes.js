const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: (process.env.RAZORPAY_KEY_ID || '').trim(),
    key_secret: (process.env.RAZORPAY_KEY_SECRET || '').trim(),
});

// @desc    Get Razorpay Key ID
// @route   GET /api/payment/key
// @access  Public
router.get('/key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
    try {
        const { amount, receipt } = req.body;
        console.log('--- Incoming Create Order Request ---');
        console.log('Amount:', amount);
        console.log('Receipt:', receipt);

        if (!amount || amount <= 0) {
            console.error('Invalid amount received');
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const options = {
            amount: Math.round(amount * 100), // Ensure it's an integer for paise
            currency: 'INR',
            receipt: receipt,
        };

        console.log('Razorpay Options:', options);

        const order = await razorpay.orders.create(options);
        console.log('Razorpay Order Created:', order.id);
        res.json(order);
    } catch (error) {
        console.error('Razorpay Order Creation Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
router.post('/verify', protect, async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderInfo
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is verified
            // Create order in database
            const order = new Order({
                user: req.user._id,
                products: orderInfo.products,
                shippingAddress: orderInfo.shippingAddress,
                paymentMethod: 'ONLINE',
                paymentStatus: 'COMPLETED',
                amount: orderInfo.amount,
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                orderStatus: 'PLACED'
            });

            const createdOrder = await order.save();
            res.status(200).json({ message: "Payment verified successfully", order: createdOrder });
        } else {
            res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Cash on Delivery Order
// @route   POST /api/payment/cod
// @access  Private
router.post('/cod', protect, async (req, res) => {
    try {
        const { orderInfo } = req.body;

        if (!orderInfo || !orderInfo.products || orderInfo.products.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            products: orderInfo.products,
            shippingAddress: orderInfo.shippingAddress,
            paymentMethod: 'COD',
            paymentStatus: 'PENDING',
            amount: orderInfo.amount,
            orderStatus: 'PLACED'
        });

        const createdOrder = await order.save();
        res.status(201).json({ message: "Order placed successfully using COD", order: createdOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
