import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    // Admin needs to see all items, including hidden ones
    api.get("/products/admin-all")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetching products", err);
        setLoading(false);
      });
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      // A missing isVisible variable implies true, so we toggle against it
      const newVisibility = currentVisibility === false ? true : false;
      await api.put(`/products/${id}/visibility`,
        { isVisible: newVisibility }
      );
      // Update local state smoothly
      setProducts(products.map(p => (p._id || p.id) === id ? { ...p, isVisible: newVisibility } : p));
    } catch (error) {
      console.error("Error toggling product visibility", error);
      alert("Failed to update product visibility status.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        alert("Product deleted successfully!");
        // Remove from UI
        setProducts(products.filter(p => (p._id || p.id) !== id));
      } catch (error) {
        console.error("Error deleting product", error);
        alert(`Failed to delete product: ${error.response?.data?.message || 'Network error'}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Products Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your store's inventory and categories.</p>
        </div>
        <Link to="/add-product" className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
          <span>+</span> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Subcategory</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Stock</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No products found.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id || product.id} className={`transition-colors ${product.isVisible === false ? 'bg-slate-50 opacity-60' : 'hover:bg-slate-50/50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image?.startsWith('/uploads') ? `http://localhost:5000${product.image}` : (product.image || 'https://via.placeholder.com/40')}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                          />
                          <span className="font-semibold text-slate-800">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.category || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.subCategory || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-800">₹{product.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-slate-700' : 'text-red-500'}`}>
                              {product.stock} items left
                            </span>
                          </div>
                          {product.stock > 0 && product.stock < 5 && (
                            <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded w-max">Low Stock Warning</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3 text-sm font-medium">
                          <button
                            onClick={() => toggleVisibility(product._id || product.id, product.isVisible)}
                            className={`px-3 py-1.5 rounded-md border text-xs transition-colors ${product.isVisible !== false
                              ? 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                              : 'border-slate-300 text-slate-600 bg-slate-100 hover:bg-slate-200'
                              }`}
                          >
                            {product.isVisible !== false ? 'In Stock (Live)' : 'Out of Stock (Hidden)'}
                          </button>

                          <Link to={`/edit-product/${product._id || product.id}`} className="text-blue-600 hover:text-blue-800 transition-colors ml-2">Edit</Link>

                          <button
                            className="text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => handleDelete(product._id || product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
