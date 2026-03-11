import axios from "axios"
import API_BASE_URL from '../config';
import { useEffect, useState } from "react"
function Products() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err))
  }, [])

  return (

    <div className="grid grid-cols-3 gap-6 p-6">

      {products.map((product) => (

        <div className="border rounded-lg p-4 shadow hover:shadow-lg">

          <img
            src={product.image?.startsWith('/uploads') ? `${API_BASE_URL}${product.image}` : (product.image || 'https://via.placeholder.com/400x400/FDE8ED/E28AA4?text=Baby+Product')}
            className="w-full h-48 object-cover rounded"
            alt={product.name}
          />

          <h2 className="text-xl font-semibold mt-2">
            {product.name}
          </h2>

          <p className="text-pink-600 font-bold">
            ₹ {product.price}
          </p>

        </div>

      ))}

    </div>

  )
}

export default Products
