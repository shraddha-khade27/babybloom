import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block text-3xl font-black text-white tracking-tight">
                            BabyBloom<span className="text-pink-500">.</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Bringing you the softest, safest, and most beautiful products. Let your baby bloom with love.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-teal-400 transition-colors">Shop All</Link></li>
                            <li><Link to="/products" className="hover:text-teal-400 transition-colors">Best Sellers</Link></li>
                            <li><Link to="/" className="hover:text-teal-400 transition-colors">Special Offers</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Help */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Customer Help</h3>
                        <ul className="space-y-4">
                            <li><Link to="/orders" className="hover:text-teal-400 transition-colors">Track Your Order</Link></li>
                            <li><Link to="/returns-refunds" className="hover:text-teal-400 transition-colors">Returns & Refunds</Link></li>
                            <li><Link to="/shipping-info" className="hover:text-teal-400 transition-colors">Shipping Information</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Contact Us</h3>
                        <div className="space-y-4">
                            <p className="text-sm">For any queries, reach out to us at:</p>
                            <a
                                href="mailto:shradhakhade610@gmail.com"
                                className="block text-teal-400 font-bold hover:text-teal-300 transition-colors break-all"
                            >
                                shradhakhade610@gmail.com
                            </a>
                            <div className="pt-2">
                                <p className="text-xs text-slate-500">We're here to help you and your baby bloom!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} BabyBloom Store. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
