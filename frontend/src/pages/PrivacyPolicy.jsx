import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-blush-50 p-8 sm:p-12">
                <h1 className="text-4xl font-black text-gray-900 font-['Outfit'] tracking-tight mb-8">Privacy Policy</h1>
                <div className="prose prose-blush max-w-none text-gray-600 leading-relaxed space-y-6">
                    <p>At BabyBloom, we value your privacy and are committed to protecting your personal data.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as your name, email address, shipping address, and phone number when you make a purchase or create an account.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">How We Use Your Information</h2>
                    <p>We use the information we collect to process your orders, communicate with you about your purchase, improve our services, and send you promotional offers if you have opted in.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Data Security</h2>
                    <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
