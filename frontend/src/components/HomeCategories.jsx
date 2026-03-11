import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeCategories = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoriesList = [
        { id: 1, name: "Clothing", description: "Soft & comfortable clothing", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80" },
        { id: 2, name: "Toys", description: "Safe and fun toys", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80" },
        { id: 3, name: "Nursery", description: "Furniture and decor", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80" },
        { id: 4, name: "Bath & Care", description: "Shampoo, lotion, & soap", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80" }
    ];

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products", err);
                setLoading(false);
            });
    }, []);

    // We no longer need getCategoryImage, we use the curated high-quality presets


    return (
        <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-['Outfit'] tracking-tight">
                            All Categories
                        </h2>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-8 lg:grid-cols-4 xl:gap-x-10">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-[2rem]"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-8 lg:grid-cols-4 xl:gap-x-10">
                        {categoriesList.map((category) => (
                            <Link to={`/shop?category=${category.name}`} key={category.id} className="group relative bg-white border border-blush-50 rounded-[2rem] overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer">
                                <div className="h-56 overflow-hidden bg-blush-50 flex items-center justify-center">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="p-6 text-center flex-1 flex flex-col justify-center border-t border-blush-50/50">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Outfit'] group-hover:text-blush-600 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {category.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HomeCategories;
