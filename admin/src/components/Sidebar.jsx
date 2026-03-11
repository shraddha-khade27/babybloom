import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-center">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 tracking-tight">
          BabyBloom<span className="text-slate-800 font-bold ml-1 text-lg">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-0">
        {[
          { name: 'Products', path: '/products', icon: '🛍️' },
          { name: 'Add Product', path: '/add-product', icon: '➕' },
          { name: 'Orders', path: '/orders', icon: '📦' },
          { name: 'Customers', path: '/customers', icon: '👥' },
        ].map((item) => {
          const isCurr = location.pathname === item.path || (item.path === '/products' && location.pathname === '/');
          const activeStyle = isCurr
            ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500 font-semibold'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent transition-colors';
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-3 text-sm ${activeStyle}`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;