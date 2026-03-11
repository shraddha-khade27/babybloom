import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setProducts(res.data.slice(0, 4));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching", err);
                setLoading(false);
            });
    }, []);

    if (loading || products.length === 0) return null;

    return (
        <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                            Shop Bestsellers
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div key={product._id || product.id} className="group bg-white rounded-[2rem] shadow-sm overflow-hidden border border-blush-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col p-2">
                            <Link to={`/products/${product._id || product.id}`} className="relative h-56 block overflow-hidden bg-blush-50 rounded-[1.5rem] flex items-center justify-center">
                                <img
                                    src={`http://localhost:5000${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </Link>
                            <div className="p-4 flex-1 flex flex-col items-center text-center">
                                <Link to={`/products/${product._id || product.id}`}>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1 font-['Outfit'] group-hover:text-blush-600 transition-colors">
                                        {index + 1}. {product.name.substring(0, 25)}{product.name.length > 25 ? '...' : ''}
                                    </h3>
                                </Link>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm font-semibold text-gray-600 flex items-center">
                                        4.{8 + (index % 3)} <span className="text-yellow-400 ml-1 text-xs">★</span>
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-base font-black text-gray-900 tracking-tight">
                                        ₹{product.price}
                                    </span>
                                </div>

                                <div className="mt-auto w-full">
                                    <button className="w-full py-2 rounded-xl bg-blush-300 text-white font-semibold text-sm hover:bg-blush-400 transition-colors shadow-sm">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedProducts;
