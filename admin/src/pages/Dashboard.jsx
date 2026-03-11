import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard-stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Here is what's happening today in your store.</p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl shadow-sm border border-slate-200">
          Loading live metrics...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Products */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl shadow-sm">
                🛍️
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Products</p>
                <h3 className="text-2xl font-black text-slate-800">{stats.totalProducts}</h3>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl shadow-sm">
                📦
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Orders</p>
                <h3 className="text-2xl font-black text-slate-800">{stats.totalOrders}</h3>
              </div>
            </div>

            {/* Total Customers */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl shadow-sm">
                👥
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Customers</p>
                <h3 className="text-2xl font-black text-slate-800">{stats.totalCustomers}</h3>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-2xl shadow-sm">
                💰
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
                <h3 className="text-2xl font-black text-slate-800">₹{stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
            {stats.recentActivity.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">No recent activity to show right now.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {stats.recentActivity.map((activity, idx) => (
                  <li key={idx} className="py-4 flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <div>
                      <p className="text-sm text-slate-800 font-medium">{activity.message}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{new Date(activity.time).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;