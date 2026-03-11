import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Wishlist = () => {
    const { wishlistItems, toggleWishlist, addToCart } = useStore();

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black text-gray-900 font-['Outfit'] tracking-tight mb-8">My Wishlist</h1>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <div key={product._id || product.id} className="group bg-white rounded-lg shadow hover:scale-105 hover:shadow-lg transition-transform duration-300 overflow-hidden flex flex-col relative">

                                {/* Wishlist Heart Overlay - Active since it's on the wishlist */}
                                <button
                                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                                    className="absolute top-2 right-2 z-10 p-2 rounded-full transition-colors bg-blush-100 text-blush-500 hover:bg-blush-200"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </button>

                                <Link to={`/products/${product._id || product.id}`} className="relative h-48 block overflow-hidden bg-blush-50">
                                    <img
                                        src={`http://localhost:5000${product.image}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                    />
                                </Link>

                                <div className="p-4 flex-1 flex flex-col">
                                    <Link to={`/products/${product._id || product.id}`} className="text-sm font-bold text-gray-800 mb-1 line-clamp-2 hover:text-blush-600">
                                        {product.name}
                                    </Link>
                                    <div className="mt-auto pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-black text-gray-900 tracking-tight">
                                                ₹{product.price}
                                            </span>
                                            <button
                                                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                                                className="text-xs font-bold text-white bg-blush-400 hover:bg-blush-500 rounded px-4 py-2 transition-colors flex items-center gap-1"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-blush-50 p-16 text-center">
                        <div className="text-6xl mb-6">💖</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Found something you like? Tap the heart icon on any item to save it here for later.</p>
                        <Link
                            to="/shop"
                            className="inline-block py-4 px-10 rounded-full font-bold text-white bg-blush-400 hover:bg-blush-500 shadow-md shadow-blush-200 transition-all"
                        >
                            Explore Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
