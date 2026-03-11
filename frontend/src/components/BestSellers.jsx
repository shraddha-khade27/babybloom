import { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BestSellers() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBestSellers();
    }, []);

    const fetchBestSellers = async () => {
        setLoading(true);
        try {
            // Fetching all products, limiting to 8 for the home page display
            const res = await axios.get(`${API_BASE_URL}/api/products`);
            // Assuming the newest or some specific criteria makes them "best sellers" 
            // For now, we take the first 8 to simulate best sellers
            setProducts(res.data.slice(0, 8));
        } catch (error) {
            console.error("Error fetching Best Sellers", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-16 bg-white min-h-[400px] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-4">
                        Best Sellers for Babies
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Discover our most loved baby clothing, toys, and care products.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-slate-50">
                                <Link to={`/products/${product._id}`}>
                                    <img
                                        src={product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                {/* Wishlist Button */}
                                <button className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm text-slate-400 hover:text-pink-500 rounded-full shadow-sm hover:shadow transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </button>
                                {/* Category Badge */}
                                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-teal-600 rounded-full shadow-sm uppercase tracking-wide">
                                    {product.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1 border-t border-slate-50">
                                <Link to={`/products/${product._id}`}>
                                    <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight group-hover:text-teal-600 transition-colors line-clamp-2">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="mt-auto pt-4 flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 font-medium mb-1">Price</span>
                                        <span className="text-xl font-black text-slate-900 tracking-tight">
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    <button className="w-10 h-10 bg-teal-50 hover:bg-teal-500 text-teal-600 hover:text-white rounded-xl flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/products" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-teal-500 text-teal-600 font-bold rounded-xl hover:bg-teal-500 hover:text-white transition-colors duration-300">
                        View All Products
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default BestSellers;
