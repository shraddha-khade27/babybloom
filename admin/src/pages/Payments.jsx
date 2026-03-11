import { useState, useEffect } from 'react';
import api from '../utils/api';

function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await api.get("/orders");
            // Extract payment relevant data from orders
            setPayments(res.data);
        } catch (error) {
            console.error("Error fetching payments", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Payment History</h1>
                    <p className="text-sm text-slate-500 mt-1">Review all transactions and payment statuses.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading payments...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Order ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Method</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No payments found.</td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr key={payment._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {formatDate(payment.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-600">
                                                #{payment._id.substring(payment._id.length - 6).toUpperCase()}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-800">
                                                {payment.user?.name || 'Guest'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                                    {payment.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                                ₹{payment.amount}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${payment.paymentStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {payment.paymentStatus || 'PENDING'}
                                                </span>
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

export default Payments;
