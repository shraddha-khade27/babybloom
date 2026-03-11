import './ProductCard.css';
import { useStore } from '../context/StoreContext';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
    const { addToCart } = useStore();
    const imageUrl = product.image ? `http://localhost:5000${product.image}` : `https://via.placeholder.com/400x400/FDE8ED/E28AA4?text=${encodeURIComponent(product.name || 'Baby Product')}`;

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart! 🛍️`);
    };

    return (
        <div className="group bg-white rounded-[2rem] border border-blush-light/50 overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden bg-blush-light/20">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 bg-white text-gray-900 border border-blush-light w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform translate-y-12 group-hover:translate-y-0 transition-all duration-500 hover:bg-blush-dark hover:text-white"
                    aria-label="Add to Cart"
                >
                    <span className="text-lg font-bold">+</span>
                </button>
            </div>

            <div className="p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blush-dark transition-colors uppercase tracking-wider">{product.name}</h3>
                <p className="text-lg font-black text-gray-900">₹{product.price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
