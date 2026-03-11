const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            console.log("Protect Middleware - Token received:", token.substring(0, 15) + "...");

            // Decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Protect Middleware - Decoded payload:", decoded);

            if (decoded.role === 'admin') {
                const Admin = require('../models/admin');
                const adminUser = await Admin.findById(decoded.id).select('-password');
                if (!adminUser) {
                    console.log("Protect Middleware - Admin account deleted/not found for ID:", decoded.id);
                    return res.status(401).json({ message: 'Not authorized, admin account deleted' });
                }
                // Create a mock user object that satisfies the admin middleware
                req.user = { _id: adminUser._id, role: 'admin', email: adminUser.email };
            } else {
                req.user = await User.findById(decoded.id).select('-password');
                if (!req.user) {
                    console.log("Protect Middleware - User account deleted/not found for ID:", decoded.id);
                    return res.status(401).json({ message: 'Not authorized, user account deleted' });
                }
            }

            console.log("Protect Middleware - Auth success, proceeding...");
            next();
        } catch (error) {
            console.error("Protect Middleware - Error during verification:", error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log("Protect Middleware - No token found in headers.");
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        console.log("Admin Middleware - Auth success");
        next();
    } else {
        console.log("Admin Middleware - Failed. User object:", req.user);
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
