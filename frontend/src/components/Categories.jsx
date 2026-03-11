import { Link } from 'react-router-dom';

const categoriesData = [
    { id: 1, name: 'Clothing', link: '/categories?category=Clothing' },
    { id: 2, name: 'Toys', link: '/categories?category=Toys' },
    { id: 3, name: 'Nursery Decor', link: '/categories?category=Nursery' },
    { id: 4, name: 'Bath & Care', link: '/categories?category=Bath+%26+Care' },
];

function Categories() {
    return (
        <section className="bg-cream py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Left Sidebar Menu */}
                <div className="md:w-64 shrink-0 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 font-['Outfit'] mb-6">Shop by Category</h3>
                    <ul className="space-y-4">
                        {categoriesData.map((category) => (
                            <li key={category.id}>
                                <Link
                                    to={category.link}
                                    className="text-gray-600 hover:text-blush-500 font-medium transition-colors cursor-pointer text-lg"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}

export default Categories;
