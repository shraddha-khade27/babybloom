import Hero from '../components/Hero';
import HomeCategories from '../components/HomeCategories';
import BestSellers from '../components/BestSellers';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import Newsletter from '../components/Newsletter';

function Home() {
  return (
    <div className="bg-cream min-h-screen pb-12">
      <Hero />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        {/* Main Content Area (Categories) */}
        <div className="flex-1 w-full relative z-20 mt-8 mb-16">
          <HomeCategories />
        </div>
      </div>

      <BestSellers />
      <WhyChooseUs />
      <PromoBanner />
      <Newsletter />
    </div>
  );
}

export default Home;
