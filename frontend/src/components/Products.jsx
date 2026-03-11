import axios from "axios"
import { useEffect, useState } from "react"

function Products() {

  const [products, setProducts] = useState([])

  useEffect(() => {

    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))

  }, [])

  return (

    <div className="grid grid-cols-4 gap-6 p-6">

      {products.map((item, index) => (

        <div key={index} className="bg-white p-4 shadow rounded">

          <img
            src={item.image?.startsWith('/uploads') ? `http://localhost:5000${item.image}` : item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />

          <h2 className="font-bold mt-2">
            {item.name}
          </h2>

          <p className="text-pink-500 font-bold">
            ₹{item.price}
          </p>

        </div>

      ))}

    </div>

  )

}

export default Products
