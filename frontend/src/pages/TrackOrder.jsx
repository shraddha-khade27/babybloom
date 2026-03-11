import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const STATUS_ORDER = ['PLACED', 'PENDING', 'PROCESSING', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED'];

const TrackOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const userInfoStr = localStorage.getItem('userInfo');
                const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
                const token = userInfo ? userInfo.token : null;

                if (!token) throw new Error("Unauthorized");

                const config = { headers: { Authorization: `Bearer ${token}` } };
                const res = await axios.get(`${API_BASE_URL}/api/orders/myorders`, config);
                const currentOrder = res.data.find(o => o._id === id);

                if (!currentOrder) throw new Error("Order not found");

                setOrder(currentOrder);

            } catch (err) {
                console.error("Error fetching order:", err);
                setError('Failed to load tracking details.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-50/30">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
    );

    if (error || !order) return (
        <div className="min-h-screen py-12 px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{error}</h2>
            <Link to="/orders" className="text-emerald-500 font-bold hover:underline">Return to My Orders</Link>
        </div>
    );

    const currentStatusIndex = STATUS_ORDER.indexOf(order.orderStatus);

    return (
        <div className="bg-emerald-50/30 min-h-screen py-12 pb-24 flex justify-center">
            <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">

                <div className="mb-8 flex items-center gap-4">
                    <Link to="/orders" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-emerald-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Track Your Order</h1>
                        <p className="text-slate-500 font-medium mt-1">Order #{order._id}</p>
                    </div>
                </div>

                <div className="space-y-8">

                    {/* Status Timeline Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-8">Delivery Status</h2>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

                            <div className="space-y-8 relative">
                                {['Order Placed', 'Processing', 'Shipped', 'Out For Delivery', 'Delivered'].map((stepStatus, index) => {
                                    // Mapping UI steps to Backend Enums
                                    const backendEnums = ['PLACED', 'PROCESSING', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED'];
                                    const stepEnumIndex = STATUS_ORDER.indexOf(backendEnums[index]);

                                    const isCompleted = currentStatusIndex >= stepEnumIndex;
                                    const isCurrent = order.orderStatus === backendEnums[index] || (index === 0 && (order.orderStatus === 'PLACED' || order.orderStatus === 'PENDING'));

                                    return (
                                        <div key={index} className="flex gap-6 relative">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 z-10 transition-colors duration-500 ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-transparent'}`}>
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <div className="pt-0.5 pb-2">
                                                <p className={`text-lg font-bold ${isCurrent ? 'text-emerald-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                                                    {stepStatus}
                                                </p>
                                                {isCurrent && (
                                                    <p className="text-sm text-slate-500 font-medium mt-1">
                                                        {index === 3 ? "Your rider is on the way!" : index === 4 ? "Package delivered successfully." : "We are preparing your package."}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Details Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Delivery Details</h2>
                            <div className="text-sm space-y-1">
                                <p className="text-slate-400 font-medium mb-1">Delivering To</p>
                                <p className="font-bold text-slate-800 text-base">{order.shippingAddress?.fullName}</p>
                                <p className="text-slate-600">{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                                <p className="text-slate-600">{order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                                <p className="text-slate-600 font-medium mt-1">Phone: {order.shippingAddress?.phone}</p>
                            </div>
                        </div>

                        <div className="flex-1 md:border-l border-slate-100 md:pl-8 pt-6 md:pt-0 border-t md:border-t-0">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Estimated Delivery</h2>
                            <div className="text-sm">
                                <p className="font-bold text-emerald-600 text-2xl">
                                    {order.orderStatus === 'DELIVERED' ? 'Delivered successfully' : 'Today by 8:00 PM'}
                                </p>
                                <p className="text-slate-500 mt-2 text-base">
                                    Your package is currently <b className="uppercase">{order.orderStatus}</b>.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
