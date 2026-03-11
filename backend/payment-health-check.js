require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/payment';

async function checkHealth() {
    console.log('--- Payment Backend Health Check ---');
    try {
        // We can't easily test 'create-order' without a valid JWT, but we can check if it exists
        console.log('Checking Razorpay credentials in .env...');
        if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
            console.log('✅ Razorpay credentials found.');
        } else {
            console.error('❌ Razorpay credentials missing in .env!');
        }

        console.log('\nNote: Token-based endpoints (create-order, verify, cod) require authentication and cannot be easily tested via this script without a valid user token.');
        console.log('Manual verification on frontend is recommended.');

    } catch (error) {
        console.error('Health check failed:', error.message);
    }
}

checkHealth();
