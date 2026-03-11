import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Shop = () => {
    // Global State
    const { addToCart, toggleWishlist, wishlistItems } = useStore();

    // State Variables
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState("newest");
    const location = useLocation();

    // Parse URL Parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        // Category Parameter
        const catParam = params.get('category');
        if (catParam) {
            const mapped = catParam.toLowerCase().replace(' & ', '').replace(' ', '');
            setSelectedCategory(mapped);
        } else {
            setSelectedCategory(null);
        }

        // Search Parameter
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchQuery(searchParam.toLowerCase());
        } else {
            setSearchQuery('');
        }

    }, [location.search]);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Category Structure
    const categories = {
        clothing: ["Girls", "Boys", "Newborn"],
        toys: ["Newborn Toys", "Soft Toys", "Learning Toys", "Activity Toys"],
        nursery: ["Baby Blanket", "Baby Pillow", "Crib Toy"],
        bathcare: [
            "All Bathing",
            "Towels & Wash Cloths",
            "Bathrobes",
            "Bath Tubs & Bathers",
            "Bath Toys",
            "Grooming Kits"
        ]
    };

    // Age Options
    const ageOptions = ["0-3 Months", "3-6 Months", "6-12 Months"];

    // Filtering Logic
    let filteredProducts = [...products];

    // Search Query Filtering
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(
            product => product.name && product.name.toLowerCase().includes(searchQuery) ||
                product.description && product.description.toLowerCase().includes(searchQuery)
        );
    }

    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(
            product => product.category && product.category.toLowerCase().replace(' & ', '').replace(' ', '') === selectedCategory
        );
    }

    if (selectedSubcategory) {
        filteredProducts = filteredProducts.filter(
            product => product.subCategory && product.subCategory.toLowerCase() === selectedSubcategory.toLowerCase()
        );
    }

    // Price Filtering
    if (selectedPriceRange === "under500") {
        filteredProducts = filteredProducts.filter(product => product.price < 500);
    }
    if (selectedPriceRange === "500to1000") {
        filteredProducts = filteredProducts.filter(product => product.price >= 500 && product.price <= 1000);
    }
    if (selectedPriceRange === "above1000") {
        filteredProducts = filteredProducts.filter(product => product.price > 1000);
    }

    // Age Filtering
    if (selectedAge) {
        filteredProducts = filteredProducts.filter(product =>
            product.description && product.description.includes(selectedAge) ||
            product.name && product.name.includes(selectedAge)
        );
    }

    // Sorting Logic
    if (sortBy === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
        filteredProducts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }


    return (
        <div className="min-h-screen bg-cream py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Left Sidebar -> Filters */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-blush-50 sticky top-24">
                        <h2 className="text-2xl font-black text-gray-900 font-['Outfit'] mb-6">Shop Filters</h2>

                        {/* Clear Filters */}
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                setSelectedSubcategory(null);
                                setSelectedPriceRange(null);
                                setSelectedAge(null);
                                setSortBy("newest");
                            }}
                            className="text-xs text-blush-600 font-bold uppercase mb-6 hover:text-blush-800"
                        >
                            Reset All Filters
                        </button>

                        {/* Categories List */}
                        <div className="space-y-6">

                            {/* Clothing Group */}
                            <div>
                                <h3
                                    className={`font-bold cursor-pointer text-lg mb-2 ${selectedCategory === 'clothing' ? 'text-blush-600' : 'text-gray-800'}`}
                                    onClick={() => setSelectedCategory(selectedCategory === 'clothing' ? null : 'clothing')}
                                >
                                    Clothing
                                </h3>
                                {selectedCategory === 'clothing' && (
                                    <ul className="pl-4 space-y-2 border-l-2 border-blush-100 mb-4">
                                        {categories.clothing.map(sub => (
                                            <li
                                                key={sub}
                                                className={`text-sm cursor-pointer hover:text-blush-500 transition-colors ${selectedSubcategory === sub ? 'text-blush-500 font-bold' : 'text-gray-600'}`}
                                                onClick={() => setSelectedSubcategory(sub)}
                                            >
                                                ▸ {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Toys Group */}
                            <div>
                                <h3
                                    className={`font-bold cursor-pointer text-lg mb-2 ${selectedCategory === 'toys' ? 'text-blush-600' : 'text-gray-800'}`}
                                    onClick={() => setSelectedCategory(selectedCategory === 'toys' ? null : 'toys')}
                                >
                                    Toys
                                </h3>
                                {selectedCategory === 'toys' && (
                                    <ul className="pl-4 space-y-2 border-l-2 border-blush-100 mb-4">
                                        {categories.toys.map(sub => (
                                            <li
                                                key={sub}
                                                className={`text-sm cursor-pointer hover:text-blush-500 transition-colors ${selectedSubcategory === sub ? 'text-blush-500 font-bold' : 'text-gray-600'}`}
                                                onClick={() => setSelectedSubcategory(sub)}
                                            >
                                                ▸ {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Nursery Group */}
                            <div>
                                <h3
                                    className={`font-bold cursor-pointer text-lg mb-2 ${selectedCategory === 'nursery' ? 'text-blush-600' : 'text-gray-800'}`}
                                    onClick={() => setSelectedCategory(selectedCategory === 'nursery' ? null : 'nursery')}
                                >
                                    Nursery
                                </h3>
                                {selectedCategory === 'nursery' && (
                                    <ul className="pl-4 space-y-2 border-l-2 border-blush-100 mb-4">
                                        {categories.nursery.map(sub => (
                                            <li
                                                key={sub}
                                                className={`text-sm cursor-pointer hover:text-blush-500 transition-colors ${selectedSubcategory === sub ? 'text-blush-500 font-bold' : 'text-gray-600'}`}
                                                onClick={() => setSelectedSubcategory(sub)}
                                            >
                                                ▸ {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Bath & Care Group */}
                            <div>
                                <h3
                                    className={`font-bold cursor-pointer text-lg mb-2 ${selectedCategory === 'bathcare' ? 'text-blush-600' : 'text-gray-800'}`}
                                    onClick={() => setSelectedCategory(selectedCategory === 'bathcare' ? null : 'bathcare')}
                                >
                                    Bath & Care
                                </h3>
                                {selectedCategory === 'bathcare' && (
                                    <ul className="pl-4 space-y-2 border-l-2 border-blush-100 mb-4">
                                        {categories.bathcare.map(sub => (
                                            <li
                                                key={sub}
                                                className={`text-sm cursor-pointer hover:text-blush-500 transition-colors ${selectedSubcategory === sub ? 'text-blush-500 font-bold' : 'text-gray-600'}`}
                                                onClick={() => setSelectedSubcategory(sub)}
                                            >
                                                ▸ {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Price</h3>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name="price" className="text-blush-500 focus:ring-blush-500" checked={selectedPriceRange === 'under500'} onChange={() => setSelectedPriceRange('under500')} />
                                    <span className="text-sm text-gray-600">Under ₹500</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name="price" className="text-blush-500 focus:ring-blush-500" checked={selectedPriceRange === '500to1000'} onChange={() => setSelectedPriceRange('500to1000')} />
                                    <span className="text-sm text-gray-600">₹500 - ₹1000</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name="price" className="text-blush-500 focus:ring-blush-500" checked={selectedPriceRange === 'above1000'} onChange={() => setSelectedPriceRange('above1000')} />
                                    <span className="text-sm text-gray-600">₹1000+</span>
                                </label>
                            </div>
                        </div>

                        {/* Age Filter */}
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Age</h3>
                            <div className="space-y-3">
                                {ageOptions.map(age => (
                                    <label key={age} className="flex items-center gap-3 cursor-pointer">
                                        <input type="radio" name="age" className="text-blush-500 focus:ring-blush-500" checked={selectedAge === age} onChange={() => setSelectedAge(age)} />
                                        <span className="text-sm text-gray-600">{age}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Product Grid */}
                <div className="flex-1">

                    {/* Top Bar -> Title & Sorting */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-gray-200">
                        <h1 className="text-3xl font-extrabold text-gray-900 font-['Outfit'] mb-4 sm:mb-0">
                            {searchQuery ? `Search Results for "${searchQuery}"` : (selectedSubcategory || selectedCategory || 'All Products')}
                            <span className="text-sm text-gray-500 font-normal ml-3">({filteredProducts.length} Results)</span>
                        </h1>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-600">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blush-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="low">Price: Low to High</option>
                                <option value="high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Content */}
                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="bg-white rounded-lg shadow overflow-hidden">
                                    <div className="h-48 bg-gray-100 animate-pulse"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                                        <div className="h-6 bg-gray-100 rounded w-1/4 animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {filteredProducts.length === 0 ? (
                                <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-blush-50">
                                    <p className="text-xl text-gray-500 font-medium">No products found matching your filters.</p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setSelectedSubcategory(null);
                                            setSelectedPriceRange(null);
                                            setSelectedAge(null);
                                            setSearchQuery('');
                                        }}
                                        className="mt-4 text-blush-600 hover:underline font-bold"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredProducts.map((product) => {
                                        const isInWishlist = wishlistItems.some(item => (item._id || item.id) === (product._id || product.id));

                                        return (
                                            <div key={product._id || product.id} className="group bg-white rounded-lg shadow hover:scale-105 hover:shadow-lg transition-transform duration-300 overflow-hidden flex flex-col relative">

                                                {/* Wishlist Heart Overlay */}
                                                <button
                                                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                                                    className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors ${isInWishlist ? 'bg-blush-100 text-blush-500' : 'bg-white/80 text-gray-400 hover:bg-blush-50 hover:text-blush-400'}`}
                                                >
                                                    <svg className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                                    </svg>
                                                </button>

                                                <Link to={`/products/${product._id || product.id}`} className="relative h-48 block overflow-hidden bg-blush-50">
                                                    <img
                                                        src={product.image && product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
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
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
