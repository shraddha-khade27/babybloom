import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';

function Home() {
    return (
        <div className="page-home">
            <Hero />
            <Categories />
            <FeaturedProducts />
        </div>
    );
}

export default Home;
