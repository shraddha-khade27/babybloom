import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';
const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('ONLINE');
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'COD'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
            toast.error("Please login to proceed to checkout");
            navigate('/login');
        }
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName) tempErrors.fullName = "Full name is required";
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Invalid email format";
        }
        if (!formData.phone) {
            tempErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            tempErrors.phone = "Phone must be exactly 10 digits";
        }
        if (!formData.address) tempErrors.address = "Address is required";
        if (!formData.city) tempErrors.city = "City is required";
        if (!formData.state) tempErrors.state = "State is required";
        if (!formData.pincode) tempErrors.pincode = "Pincode is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal; // Shipping and Tax removed

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const orderInfo = {
                products: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image
                })),
                shippingAddress: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                amount: total
            };

            if (formData.paymentMethod === 'COD') {
                const { data } = await axios.post(`${API_BASE_URL}/api/payment/cod`, { orderInfo }, config);
                if (data.order) {
                    toast.success("Order Placed Successfully via COD 🎉");
                    clearCart();
                    navigate('/orders', { state: { message: "Order placed successfully!" } });
                }
            } else {
                // Online Payment Flow
                const res = await loadRazorpayScript();
                if (!res) {
                    toast.error("Razorpay SDK failed to load. Are you online?");
                    setLoading(false);
                    return;
                }

                // Create Order on Backend
                const { data: razorpayOrder } = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
                    amount: total,
                    receipt: `receipt_${Date.now()}`
                }, config);

                const { data: keyRes } = await axios.get(`${API_BASE_URL}/api/payment/key`);

                const options = {
                    key: keyRes.key,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    name: "BabyBloom Store",
                    description: "Order Payment",
                    order_id: razorpayOrder.id,
                    handler: async function (response) {
                        try {
                            const verifyData = {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderInfo
                            };

                            const { data: verifyRes } = await axios.post(`${API_BASE_URL}/api/payment/verify`, verifyData, config);

                            if (verifyRes.order) {
                                toast.success("Payment Successful! Order Confirmed 🎉");
                                clearCart();
                                navigate('/orders', { state: { message: "Payment successful and order placed!" } });
                            }
                        } catch (error) {
                            toast.error("Payment verification failed. Please contact support.");
                            console.error(error);
                        }
                    },
                    prefill: {
                        name: formData.fullName,
                        email: formData.email,
                        contact: formData.phone
                    },
                    notes: {
                        address: formData.address
                    },
                    theme: {
                        color: "#ec4899" // pink-500
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                paymentObject.on('payment.failed', function (response) {
                    toast.error("Payment failed. Please try again.");
                    setLoading(false);
                });
            }
        } catch (error) {
            toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Shipping Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`w-full p-3 bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all`}
                                        placeholder="John Doe"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full p-3 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all`}
                                        placeholder="10 digit number"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className={`w-full p-3 bg-gray-50 border ${errors.pincode ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all`}
                                        placeholder="6 digits"
                                    />
                                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`w-full p-3 bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all`}
                                    placeholder="Street, Apartment, etc."
                                ></textarea>
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full p-3 bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all`}
                                        placeholder="City Name"
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`w-full p-3 bg-gray-50 border ${errors.state ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition-all`}
                                        placeholder="State Name"
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'COD' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-gray-200'}`}
                                        onClick={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 ${formData.paymentMethod === 'COD' ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}></div>
                                            <span className="font-medium text-gray-800">Cash on Delivery</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'ONLINE' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-gray-200'}`}
                                        onClick={() => setFormData({ ...formData, paymentMethod: 'ONLINE' })}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 ${formData.paymentMethod === 'ONLINE' ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}></div>
                                            <span className="font-medium text-gray-800">Online Payment</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full mt-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-200 transition-all transform ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
                            >
                                {loading ? 'Processing...' : `Place Order (₹${total.toLocaleString('en-IN')})`}
                            </button>

                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-[400px] overflow-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                        <img src={`${API_BASE_URL}${item.image}`} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-gray-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-6 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-gray-900 text-lg font-bold pt-3 border-t border-gray-100">
                                <span>Total Amount</span>
                                <span className="text-pink-600">₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-pink-50 rounded-xl border border-pink-100">
                            <p className="text-xs text-pink-700 text-center">
                                Free Delivery on all orders for a limited time! 🎀
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
