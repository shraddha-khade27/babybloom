import { useState, useEffect } from 'react';
import api from '../utils/api';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomersAndOrders();
    }, []);

    const fetchCustomersAndOrders = async () => {
        setLoading(true);
        try {
            // Fetch all users and all orders
            const [usersRes, ordersRes] = await Promise.all([
                api.get("/users"),
                api.get("/orders")
            ]);

            const users = usersRes.data.filter(u => u.role !== 'admin');
            const orders = ordersRes.data;

            // Map order count to each user
            const customersData = users.map(user => {
                const userOrders = orders.filter(o => o.user && o.user._id === user._id);
                return {
                    ...user,
                    orderCount: userOrders.length,
                    totalSpent: userOrders.reduce((acc, curr) => acc + curr.amount, 0)
                };
            });

            setCustomers(customersData);
        } catch (error) {
            console.error("Error fetching customers", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
                    <p className="text-sm text-slate-500 mt-1">View registered customers and their order history.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading customers...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4 font-semibold">Customer Name</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold">Total Orders</th>
                                    <th className="px-6 py-4 font-semibold">Total Spent</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {customers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No customers found.</td>
                                    </tr>
                                ) : (
                                    customers.map((user) => (
                                        <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold uppercase">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <span className="font-semibold text-slate-800">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">{user.orderCount}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-emerald-600">₹{user.totalSpent}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium">
                                                    View Details
                                                </button>
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

export default Customers;
