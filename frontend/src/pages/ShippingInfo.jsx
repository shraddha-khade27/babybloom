import React from 'react';

const ShippingInfo = () => {
    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-blush-50 p-8 sm:p-12">
                <h1 className="text-4xl font-black text-gray-900 font-['Outfit'] tracking-tight mb-8">Shipping Information</h1>
                <div className="prose prose-blush max-w-none text-gray-600 leading-relaxed space-y-6">
                    <p>At BabyBloom, we are committed to delivering your little one's essentials as quickly and safely as possible.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Free Delivery</h2>
                    <p>We are proud to offer <strong>FREE delivery</strong> on all orders across India! There's no minimum purchase required – every order qualifies for free shipping.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Delivery Timeline</h2>
                    <p>Orders are typically processed within 24-48 hours. Depending on your location, you can expect your package to arrive within 3 to 7 business days.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Order Tracking</h2>
                    <p>Once your order is shipped, you will receive a tracking ID via email/SMS. You can also track your order directly on our website using the "Track Your Order" link in the footer.</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;
