import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Babycaretips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedTip, setExpandedTip] = useState(null);

    const categories = ['All', 'Feeding', 'Sleep', 'Health', 'Development', 'Safety', 'Skincare'];

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/tips`);
                setTips(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tips:", error);
                setLoading(false);
            }
        };
        fetchTips();
    }, []);

    const filteredTips = selectedCategory === 'All' 
        ? tips 
        : tips.filter(tip => tip.category === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <div className="w-12 h-12 border-4 border-blush-200 border-t-blush-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 font-['Outfit'] mb-4">Baby Care Tips</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Expert advice and essential tips to help you navigate your journey through parenthood with confidence.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                                selectedCategory === category 
                                ? 'bg-blush-500 text-white shadow-lg scale-105' 
                                : 'bg-white text-gray-600 hover:bg-blush-50 hover:text-blush-600 border border-gray-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Tips Grid */}
                {filteredTips.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-blush-50">
                        <p className="text-xl text-gray-500">No tips found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTips.map(tip => (
                            <div 
                                key={tip._id} 
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer"
                                onClick={() => setExpandedTip(tip)}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={tip.image ? `${API_BASE_URL}${tip.image}` : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                                        alt={tip.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-blush-600 px-4 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                                            {tip.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blush-600 transition-colors">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                                        {tip.content}
                                    </p>
                                    <button className="text-blush-500 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Read More <span>→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for Full Content */}
            {expandedTip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setExpandedTip(null)}></div>
                    <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
                        <button 
                            onClick={() => setExpandedTip(null)}
                            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-500 p-2 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        <div className="h-64 sm:h-80 w-full overflow-hidden">
                            <img 
                                src={expandedTip.image ? `${API_BASE_URL}${expandedTip.image}` : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                                alt={expandedTip.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <div className="p-8 sm:p-12">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-blush-50 text-blush-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {expandedTip.category}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {new Date(expandedTip.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-6 font-['Outfit']">{expandedTip.title}</h2>
                            <div className="prose prose-blush max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {expandedTip.content}
                            </div>
                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <button 
                                    onClick={() => setExpandedTip(null)}
                                    className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blush-500 transition-colors"
                                >
                                    Close Reading
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Babycaretips;
