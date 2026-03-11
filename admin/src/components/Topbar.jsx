function Topbar() {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm z-10">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-slate-800">Hi! Admin</h2>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white px-5 py-1.5 rounded-full transition-colors shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;