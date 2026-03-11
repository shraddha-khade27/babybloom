import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userInfo));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-[70vh] bg-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-sm border border-blush-100 p-10 text-center transition-all hover:shadow-md relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blush-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-sage-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

        <div className="relative inline-block mb-2">
          {/* Default user placeholder */}
          <div className="w-28 h-28 rounded-full mx-auto border-[6px] border-white shadow-sm bg-blush-50 flex items-center justify-center overflow-hidden">
            <span className="text-4xl text-blush-400 font-bold capitalize">{user.name.charAt(0)}</span>
          </div>
          <div className="absolute bottom-2 right-2 bg-pink-500 w-5 h-5 rounded-full border-[3px] border-white shadow-sm ring-2 ring-pink-100"></div>
        </div>

        <h2 className="mt-4 text-3xl font-bold text-gray-900 font-['Outfit'] tracking-tight">
          Welcome, <span className="text-blush-500 capitalize">{user.name.split(' ')[0]}</span>!
        </h2>

        <div className="mt-3 inline-flex">
          <p className="text-sm font-medium text-gray-500 bg-blush-50/50 px-5 py-2 rounded-full border border-blush-100/50 tracking-wide">
            {user.email}
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-50 flex justify-center">
          <Link to="/orders" className="bg-sage-50/50 p-6 rounded-2xl text-center border border-sage-100/30 hover:bg-sage-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all w-full max-w-sm cursor-pointer block group/order">
            <p className="text-sm text-sage-600 font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2 group-hover/order:text-sage-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              View My Orders
            </p>
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full px-6 py-4 border border-blush-200 text-blush-600 rounded-2xl hover:bg-blush-50 hover:text-blush-700 hover:border-blush-300 font-semibold tracking-wide transition-all flex items-center justify-center gap-3 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout Account
        </button>
      </div>
    </div>
  );
}

export default Profile;
