'use client'


import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products))
  },[])

  console.log(products)

  return (
    <div className="my-12 max-w-[1140px] mx-auto">
      <h1 className="text-3xl text-center font-semibold text-[#592D02]">All Products Here</h1>


    {/* products section here  */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 sm:px-7 my-6">
      {
        products.map((product)=> (
          <ProductCard key={product.id} product={product} />
        ))
      }

    </div>
    </div>
  );
}
