import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../context/StoreContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useStore();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        setAdding(true);
        addToCart(product, quantity);
        setTimeout(() => setAdding(false), 500);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cream py-16 px-4 font-sans text-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-64 h-64 bg-slate-200 rounded-[2rem]"></div>
                    <div className="w-48 h-8 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-cream py-16 font-sans text-center">
                <h1 className="text-2xl font-bold text-slate-800">Product not found.</h1>
                <button onClick={() => navigate('/shop')} className="mt-4 text-blush-500 underline font-bold">Back to Shop</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm border border-blush-50 overflow-hidden">
                <div className="flex flex-col md:flex-row">

                    {/* Left - Image */}
                    <div className="md:w-1/2 p-8 lg:p-12 bg-blush-50/50 flex items-center justify-center border-b md:border-b-0 md:border-r border-blush-50">
                        <img
                            src={product.image && product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`}
                            alt={product.name}
                            className="w-full max-w-md h-auto object-contain drop-shadow-sm rounded-xl"
                        />
                    </div>

                    {/* Right - Details */}
                    <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-xs font-bold tracking-wider text-blush-500 uppercase">
                                {product.category || 'Collection'}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 font-['Outfit'] tracking-tight mb-4">
                            {product.name}
                        </h1>

                        <div className="text-3xl font-extrabold text-gray-900 mb-6">
                            ₹{product.price}
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-8 border-t border-b border-gray-100 py-6">
                            <p className="leading-relaxed">{product.description || 'No description available for this product.'}</p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-sm font-bold text-gray-700">Quantity</span>
                            <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-1">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            {product.countInStock > 0 && <span className="text-xs text-emerald-600 font-medium ml-2">{product.countInStock} in stock</span>}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={adding}
                                className={`flex-1 py-4 px-8 rounded-full font-bold text-center transition-all ${adding ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-blush-50 text-blush-600 hover:bg-blush-100 border border-blush-200'}`}
                            >
                                {adding ? 'Added!' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 py-4 px-8 rounded-full font-bold text-center bg-blush-400 text-white hover:bg-blush-500 shadow-md shadow-blush-200 transition-all"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
