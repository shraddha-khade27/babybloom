require('dotenv').config();
console.log('--- ENV Diagnostics ---');
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_ID Length:', process.env.RAZORPAY_KEY_ID?.length);
console.log('RAZORPAY_KEY_SECRET Length:', process.env.RAZORPAY_KEY_SECRET?.length);
console.log('RAZORPAY_KEY_SECRET (last 4):', process.env.RAZORPAY_KEY_SECRET?.slice(-4));
