function WhyChooseUs() {
    const features = [
        {
            title: "Baby Safe Products",
            description: "All products are carefully selected, non-toxic, and absolutely safe for babies.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
            )
        },
        {
            title: "Fast & Reliable Delivery",
            description: "Get your baby essentials delivered quickly and safely to your doorstep.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
            )
        },
        {
            title: "Premium Quality",
            description: "High-quality, durable materials designed specifically for your baby's comfort.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
            )
        },
        {
            title: "Affordable Prices",
            description: "The best quality products for your little ones at budget-friendly prices.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            )
        }
    ];

    return (
        <section className="py-20 bg-emerald-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side Image */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-pink-200 to-teal-200 rounded-[2.5rem] opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop"
                            alt="Happy baby with toys"
                            className="relative rounded-[2rem] w-full h-[500px] object-cover shadow-2xl z-10 block"
                        />

                        {/* Floating Badge */}
                        <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce-slow">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
                                💖
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">10k+ Happy</p>
                                <p className="text-xs text-slate-500">Parents & Babies</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Content */}
                    <div className="w-full lg:w-1/2 lg:pl-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100/50 text-teal-700 text-sm font-bold mb-6">
                            <span>✨</span> The BabyBloom Difference
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight mb-6">
                            Why Parents Love <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-pink-500">BabyBloom</span>
                        </h2>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                            We understand that nothing is more important than your baby's comfort and safety. Here's why thousands of parents trust us.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-teal-500">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-2">{feature.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;
