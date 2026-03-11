import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="bg-cream py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[3rem] overflow-hidden bg-white border border-blush-light shadow-premium flex flex-col md:flex-row items-center justify-between min-h-[500px] hover:shadow-hover transition-all duration-500">

                    {/* Content Left */}
                    <div className="p-10 md:p-20 md:w-1/2 z-10 relative">
                        <span className="inline-block px-4 py-1.5 bg-blush-light text-blush-dark text-xs font-bold uppercase tracking-widest rounded-full mb-6">Premium Collection</span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 font-['Outfit'] leading-[1.05] tracking-tighter mb-6 uppercase">
                            Softest Care <br className="hidden lg:block" /> for Your Baby
                        </h1>
                        <p className="text-lg text-gray-500 mb-10 max-w-sm leading-relaxed font-medium">
                            Explore our curated collection of organic essentials designed with love and safety first.
                        </p>
                        <Link to="/shop" className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-xl uppercase tracking-wider text-sm">
                            Shop the collection
                        </Link>
                    </div>

                    {/* Image Right */}
                    <div className="md:w-1/2 w-full p-4 md:p-12 flex items-center justify-center z-10">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blush-light rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                            <img
                                src="/hero-bunny.png"
                                alt="Baby in bunny hat"
                                className="relative w-full max-h-[400px] object-cover rounded-[2.5rem] shadow-2xl group-hover:-translate-y-2 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0"></div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
