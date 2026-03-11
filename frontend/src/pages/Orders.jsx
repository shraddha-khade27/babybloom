import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();

    const fetchMyOrders = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            if (!token) {
                setError('Please log in to view your orders.');
                setLoading(false);
                return;
            }

            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get('http://localhost:5000/api/orders/myorders', config);

            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError('Failed to load your order history.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, {}, config);

            toast.success("Order cancelled successfully");
            fetchMyOrders(); // Refresh list
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to cancel order");
        }
    };

    return (
        <div className="min-h-[80vh] bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-4">
                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
                        My Orders
                    </h1>
                    <Link to="/shop" className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors">
                        Continue Shopping →
                    </Link>
                </div>

                {location.state?.message && (
                    <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-medium animate-fade-in">
                        {location.state.message}
                    </div>
                )}

                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-50 rounded-2xl h-48 animate-pulse border border-gray-100"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                        <p className="text-red-500 font-medium mb-6">{error}</p>
                        <Link to="/login" className="inline-block py-3 px-8 rounded-xl font-bold text-white bg-pink-500 hover:bg-pink-600 transition-all shadow-lg shadow-pink-100">
                            Log In
                        </Link>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't placed any orders yet.</p>
                        <Link
                            to="/shop"
                            className="inline-block py-3 px-10 rounded-xl font-bold text-white bg-pink-500 hover:bg-pink-600 transition-all shadow-lg shadow-pink-100"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                {/* Order Header */}
                                <div className="px-6 py-4 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                                    <div className="flex gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        <div>
                                            <p className="mb-1 text-[10px] text-gray-400">Order ID</p>
                                            <p className="text-gray-700">#{order._id.slice(-8)}</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-[10px] text-gray-400">Date</p>
                                            <p className="text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        {order.expectedDeliveryDate && order.orderStatus !== 'DELIVERED' && order.orderStatus !== 'CANCELLED' && (
                                            <div>
                                                <p className="mb-1 text-[10px] text-pink-400">Exp. Delivery</p>
                                                <p className="text-pink-600">{new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Total Amount</p>
                                        <p className="text-lg font-black text-gray-900">₹{order.amount?.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="p-6">
                                    <div className="divide-y divide-gray-50">
                                        {order.products?.map((item, index) => (
                                            <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-6">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-1">
                                                        <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <Link to={`/products/${item.product}`} className="font-bold text-gray-800 hover:text-pink-600 transition-colors line-clamp-1">
                                                            {item.name}
                                                        </Link>
                                                        <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions & Status */}
                                <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${order.orderStatus === 'DELIVERED' ? 'bg-emerald-500' :
                                                order.orderStatus === 'CANCELLED' ? 'bg-red-400' : 'bg-amber-400'
                                            }`}></div>
                                        <span className={`text-xs font-black uppercase tracking-widest ${order.orderStatus === 'DELIVERED' ? 'text-emerald-600' :
                                                order.orderStatus === 'CANCELLED' ? 'text-red-500' : 'text-amber-600'
                                            }`}>
                                            {order.orderStatus}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        {order.orderStatus === 'PLACED' && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="px-4 py-2 text-xs font-bold text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-lg transition-all"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                        <Link
                                            to={`/track-order/${order._id}`}
                                            className="px-6 py-2 text-xs font-bold text-white bg-gray-800 hover:bg-gray-900 rounded-lg shadow-sm transition-all"
                                        >
                                            Track Order
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
