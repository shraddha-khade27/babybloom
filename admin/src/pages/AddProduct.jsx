import { useState } from "react"
import api from "../utils/api"
import { useNavigate } from "react-router-dom"

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subCategory: "",
    description: "",
    stock: ""
  });

  const subCategoryOptions = {
    "Clothing": ["Girls", "Boys", "Newborn"],
    "Toys": ["Newborn Toys", "Soft Toys", "Learning Toys", "Activity Toys"],
    "Nursery": ["Baby Blanket", "Baby Pillow", "Crib Toy"],
    "Bath & Care": ["All Bathing", "Towels & Wash Cloths", "Bathrobes", "Bath Tubs & Bathers", "Bath Toys", "Grooming Kit"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      // Reset subcategory when category changes
      setProduct({ ...product, category: value, subCategory: "" });
    } else {
      setProduct({ ...product, [name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create FormData to support image upload
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('subCategory', product.subCategory);
      formData.append('description', product.description);
      formData.append('stock', product.stock);

      if (selectedImage) {
        formData.append('image', selectedImage);
      } else {
        alert("Please select an image to upload");
        setLoading(false);
        return;
      }

      await api.post("/products", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Product successfully added!");
      navigate('/products');
    } catch (error) {
      console.error("Error adding product", error);
      alert(`Failed to add product: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <span className="cursor-pointer hover:text-gray-600 flex items-center gap-1" onClick={() => navigate('/')}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/products')}>Products</span>
          <span className="mx-2">/</span>
          <span className="text-teal-500 font-medium">Add New Product</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-500 text-sm mt-1">Add a new product to your store</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Card 1: Name and Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">Name and Description</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
                  <input
                    name="name"
                    required
                    placeholder="Premium Half Sleeve T-Shirt - Brooklyn Fleece"
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Product Description</label>
                  <textarea
                    name="description"
                    rows="6"
                    placeholder="Enter short description here..."
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Card 2: Category */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">Category</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Product Category</label>
                  <select
                    name="category"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Toys">Toys</option>
                    <option value="Nursery">Nursery Decor</option>
                    <option value="Bath & Care">Bath & Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Subcategory</label>
                  <select
                    name="subCategory"
                    required
                    value={product.subCategory}
                    onChange={handleChange}
                    disabled={!product.category}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">Select Subcategory</option>
                    {product.category && subCategoryOptions[product.category === 'Nursery Decor' ? 'Nursery' : product.category]?.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Card 3: Manage Stock */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">Manage Stock</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Product Stock</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    placeholder="10,120"
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Card 4: Pricing */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">Product Pricing</h2>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="12,120.00"
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md pl-8 pr-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Card 5: Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-800">Product Image</h2>
              </div>

              <div className="mt-2">
                <div className="border-2 border-dashed border-teal-200 rounded-lg p-8 flex flex-col items-center justify-center bg-teal-50/20 text-center cursor-pointer hover:bg-teal-50/50 transition-colors" onClick={() => document.getElementById('imageUpload').click()}>
                  <div className="text-teal-400 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <span className="text-teal-500 font-medium text-sm">Click to Upload</span>
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedImage(e.target.files[0]);
                      }
                    }}
                  />
                </div>
                {selectedImage && (
                  <p className="text-xs text-gray-500 mt-2 truncate">Selected: {selectedImage.name}</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-end gap-3 items-center">
          <button
            type="button"
            className="px-6 py-2 border border-gray-200 text-gray-600 rounded bg-white text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            Save Product
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-teal-500 text-white rounded text-sm font-medium hover:bg-teal-600 transition-colors flex items-center gap-2"
          >
            {loading ? 'Adding...' : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Add Product
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  )
}

export default AddProduct