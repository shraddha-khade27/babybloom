require('dotenv').config({ path: './backend/.env' });
const Razorpay = require('razorpay');

console.log('--- Razorpay Credential Verification ---');
console.log('Using Key ID:', process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
    key_id: (process.env.RAZORPAY_KEY_ID || '').trim(),
    key_secret: (process.env.RAZORPAY_KEY_SECRET || '').trim(),
});

async function verify() {
    try {
        console.log('Attempting to create a test order...');
        const order = await razorpay.orders.create({
            amount: 100, // INR 1.00
            currency: 'INR',
            receipt: 'test_receipt'
        });
        console.log('✅ Success! Razorpay Order ID:', order.id);
    } catch (error) {
        console.error('❌ Razorpay Error:', error);
        if (error.statusCode === 401) {
            console.error('\nSUGGESTION: The credentials in .env seem to be invalid or deactivated.');
        }
    }
}

verify();
