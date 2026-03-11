import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';

function Navbar() {
  const { cartCount, wishlistCount, userInfo, setUserInfo } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    toast.info("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-3 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-md border-b border-blush-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/logo.png"
            alt="BabyBloom Logo"
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500"
          />
          <span className="text-2xl font-black text-gray-900 font-['Outfit'] tracking-tighter uppercase">BabyBloom</span>
        </Link>

        {/* Center Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li><Link to="/" className="hover:text-blush-500 transition-colors">Home</Link></li>
          <li><Link to="/shop?category=Clothing" className="hover:text-blush-500 transition-colors">Clothing</Link></li>
          <li><Link to="/shop?category=Toys" className="hover:text-blush-500 transition-colors">Toys</Link></li>
          <li><Link to="/shop?category=Nursery" className="hover:text-blush-500 transition-colors">Nursery</Link></li>
          <li><Link to="/shop?category=Bath+%26+Care" className="hover:text-blush-500 transition-colors">Bath & Care</Link></li>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Animated Search Bar */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center animate-fade-in">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 sm:w-64 border border-blush-200 rounded-l-full py-1.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blush-400"
                  autoFocus
                />
                <button type="submit" className="bg-blush-400 text-white px-3 py-1.5 rounded-r-full text-sm font-bold hover:bg-blush-500 transition-colors border border-blush-400">
                  Go
                </button>
                <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center gap-1 hover:text-blush-500 transition-colors group px-2">
                <Search className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:block">Search</span>
              </button>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-1">
            {userInfo && userInfo.token ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex flex-col items-center gap-1 hover:text-blush-500 transition-colors group px-2">
                  <div className="w-5 h-5 bg-blush-400 text-white rounded-full flex items-center justify-center text-[10px] font-bold group-hover:-translate-y-0.5 transition-transform uppercase">
                    {userInfo.name.charAt(0)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:block">{userInfo.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="flex flex-col items-center gap-1 hover:text-pink-500 transition-colors group px-2 text-gray-400">
                  <LogOut className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex flex-col items-center gap-1 hover:text-blush-500 transition-colors group px-2">
                <User className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:block">Account</span>
              </Link>
            )}
          </div>

          <Link to="/wishlist" className="flex flex-col items-center gap-1 hover:text-blush-500 transition-colors relative group px-2">
            <Heart className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:block">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 right-0 sm:-right-1 bg-blush-400 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shrink-0">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="flex flex-col items-center gap-1 hover:text-blush-500 transition-colors relative group px-2">
            <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-0 sm:-right-1 bg-blush-400 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shrink-0">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-blush-50 shadow-lg py-4 px-6 animate-fade-in">
          <ul className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wide">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/shop?category=Clothing" onClick={() => setIsMenuOpen(false)}>Clothing</Link></li>
            <li><Link to="/shop?category=Toys" onClick={() => setIsMenuOpen(false)}>Toys</Link></li>
            <li><Link to="/shop?category=Nursery" onClick={() => setIsMenuOpen(false)}>Nursery</Link></li>
            <li><Link to="/shop?category=Bath+%26+Care" onClick={() => setIsMenuOpen(false)}>Bath & Care</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;