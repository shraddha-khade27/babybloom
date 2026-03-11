import React from 'react';
import API_BASE_URL from '../config';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateCartQuantity, cartTotal } = useStore();

    const finalTotal = cartTotal;

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black text-gray-900 font-['Outfit'] tracking-tight mb-8">Shopping Cart</h1>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Cart Items List */}
                        <div className="flex-1">
                            <div className="bg-white rounded-[2rem] shadow-sm border border-blush-50 overflow-hidden">
                                <ul className="divide-y divide-blush-50">
                                    {cartItems.map((item) => (
                                        <li key={item._id || item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 group hover:bg-blush-50/20 transition-colors">

                                            <Link to={`/products/${item._id || item.id}`} className="shrink-0 w-32 h-32 bg-blush-50 rounded-xl overflow-hidden block">
                                                <img
                                                    src={`${API_BASE_URL}${item.image}`}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </Link>

                                            <div className="flex-1 w-full text-center sm:text-left">
                                                <Link to={`/products/${item._id || item.id}`} className="text-xl font-bold text-gray-900 hover:text-blush-600 transition-colors">
                                                    {item.name}
                                                </Link>
                                                <p className="mt-1 text-sm font-medium text-blush-500">{item.category}</p>
                                                <p className="mt-2 text-lg font-extrabold text-gray-900">₹{item.price}</p>
                                            </div>

                                            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">

                                                {/* Qty Selector */}
                                                <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-1">
                                                    <button
                                                        onClick={() => updateCartQuantity(item._id || item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateCartQuantity(item._id || item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item._id || item.id)}
                                                    className="text-sm font-bold text-red-500 hover:text-red-700 hover:underline transition-colors px-2 py-1"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-96 shrink-0">
                            <div className="bg-white rounded-[2rem] shadow-sm border border-blush-50 p-6 sm:p-8 sticky top-24">
                                <h2 className="text-xl font-black text-gray-900 font-['Outfit'] mb-6">Order Summary</h2>

                                <div className="space-y-4 text-sm font-medium text-gray-600 mb-6 border-b border-blush-50 pb-6 text-center">
                                    <div className="flex justify-between items-center bg-blush-50/50 p-4 rounded-2xl">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="text-xl font-bold text-gray-900">₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-bold bg-emerald-50 py-2 rounded-full">✨ Order is eligible for Free Delivery! ✨</p>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-3xl font-black text-blush-600 tracking-tight">₹{finalTotal.toFixed(2)}</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="block w-full text-center py-4 px-8 rounded-full font-bold text-white bg-blush-400 hover:bg-blush-500 shadow-md shadow-blush-200 transition-all mb-4"
                                >
                                    Proceed to Checkout
                                </Link>
                                <Link
                                    to="/shop"
                                    className="block w-full text-center py-3 px-8 rounded-full font-bold text-blush-500 bg-blush-50 hover:bg-blush-100 transition-all"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-blush-50 p-16 text-center">
                        <div className="text-6xl mb-6">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Let's fix that!</p>
                        <Link
                            to="/shop"
                            className="inline-block py-4 px-10 rounded-full font-bold text-white bg-blush-400 hover:bg-blush-500 shadow-md shadow-blush-200 transition-all"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
