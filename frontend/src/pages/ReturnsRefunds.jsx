import React from 'react';

const ReturnsRefunds = () => {
    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-blush-50 p-8 sm:p-12">
                <h1 className="text-4xl font-black text-gray-900 font-['Outfit'] tracking-tight mb-8">Returns & Refunds</h1>
                <div className="prose prose-blush max-w-none text-gray-600 leading-relaxed space-y-6">
                    <p>We want you and your baby to be completely happy with your purchase. If you're not satisfied, we're here to help.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Easy Returns</h2>
                    <p>You can return most items within 7 days of delivery. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Refund Process</h2>
                    <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 5-7 business days.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Non-Returnable Items</h2>
                    <p>For hygiene reasons, certain items like baby care products (lotions, powders, etc.) and undergarments cannot be returned once the seal is broken or the item is used.</p>
                </div>
            </div>
        </div>
    );
};

export default ReturnsRefunds;
