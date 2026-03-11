import { Link } from 'react-router-dom';

function PromoBanner() {
    return (
        <section className="py-12 md:py-24 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-pink-50 via-white to-teal-50 overflow-hidden shadow-sm border border-slate-100 relative group">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-300/20 transition-colors duration-700"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 group-hover:bg-pink-300/20 transition-colors duration-700"></div>

                <div className="flex flex-col md:flex-row items-center relative z-10">

                    {/* Image Area */}
                    <div className="w-full md:w-1/2 object-cover">
                        <img
                            src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=80"
                            alt="Baby playing with soft toys"
                            className="w-full h-64 md:h-full object-cover min-h-[400px] hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-start text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/50 text-pink-700 text-sm font-bold mb-6">
                            <span>✨</span> Sale is Live
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-6">
                            Give Your Baby the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Best Start</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-md">
                            Discover premium baby clothing, toys, and care products designed with love and maximum comfort.
                        </p>

                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-teal-500 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300 group"
                        >
                            Shop Now
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default PromoBanner;
