import React from 'react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-blush-50 p-8 sm:p-12">
                <h1 className="text-4xl font-black text-gray-900 font-['Outfit'] tracking-tight mb-8">Terms of Service</h1>
                <div className="prose prose-blush max-w-none text-gray-600 leading-relaxed space-y-6">
                    <p>Welcome to BabyBloom. By using our website, you agree to comply with and be bound by the following terms and conditions.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Use of the Website</h2>
                    <p>You must be at least 18 years old or visiting the site under the supervision of a parent or guardian. You are responsible for maintaining the confidentiality of your account and password.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Product Information</h2>
                    <p>We attempt to be as accurate as possible with our product descriptions. However, we do not warrant that product descriptions or other content are error-free.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Limitation of Liability</h2>
                    <p>BabyBloom shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
