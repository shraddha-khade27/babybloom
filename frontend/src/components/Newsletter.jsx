function Newsletter() {
    return (
        <section className="py-24 bg-teal-50 relative overflow-hidden">

            {/* Decorative Background Patterns */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg border border-teal-100 flex items-center justify-center mx-auto mb-8 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                    <span className="text-4xl">💌</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-6">
                    Never Miss <span className="text-teal-600">BabyBloom</span> Offers
                </h2>

                <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                    Subscribe to receive new arrivals, exclusive discounts, and helpful baby care tips directly in your inbox. No spam, we promise!
                </p>

                <form className="max-w-xl mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter!'); }}>
                    <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-sm border border-slate-200 focus-within:ring-4 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-all">

                        <div className="flex-1 flex items-center pl-4">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address"
                                className="w-full bg-transparent border-none px-4 py-3 text-slate-800 focus:outline-none focus:ring-0 placeholder:text-slate-400 font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-teal-500 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-teal-600 active:transform active:scale-95 transition-all shadow-md hover:shadow-lg sm:w-auto w-full"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>

                <p className="text-sm text-slate-400 mt-6 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    We respect your privacy.
                </p>

            </div>
        </section>
    );
}

export default Newsletter;
