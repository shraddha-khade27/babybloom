import { useState, useEffect } from 'react';
import api from '../utils/api';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders");
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`,
                { status: newStatus }
            );
            // Update local state
            setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'DELIVERED': return 'bg-emerald-100 text-emerald-700';
            case 'OUT FOR DELIVERY': return 'bg-teal-100 text-teal-700';
            case 'SHIPPED': return 'bg-blue-100 text-blue-700';
            case 'PROCESSING': return 'bg-purple-100 text-purple-700';
            case 'PENDING': return 'bg-amber-100 text-amber-700';
            default: return 'bg-pink-100 text-pink-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Orders Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Track and update customer order statuses.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading orders...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4 font-semibold">Order ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Products</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Payment</th>
                                    <th className="px-6 py-4 font-semibold text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No orders found.</td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-mono text-slate-600">
                                                #{order._id.substring(order._id.length - 6).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-800">{order.user?.name || 'Guest'}</div>
                                                <div className="text-xs text-slate-500">{order.user?.email || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {order.products?.length || 0} items
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                                ₹{order.amount || order.totalPrice || 0}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                                    {order.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <select
                                                    value={order.orderStatus || 'PENDING'}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer ${getStatusColor(order.orderStatus || 'PENDING')}`}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="PROCESSING">Processing</option>
                                                    <option value="SHIPPED">Shipped</option>
                                                    <option value="OUT FOR DELIVERY">Out for Delivery</option>
                                                    <option value="DELIVERED">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
