"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilterProducts(data.products);
      });
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(e.target.value);

    const result = products.filter((product) =>
      product.title.toLowerCase().includes(text)
    );
    setFilterProducts(result);
  };

  return (
    <div className="my-12 max-w-[1140px] mx-auto">
      <h1 className="text-3xl text-center font-semibold text-[#592D02]">
        All Products Here
      </h1>

      <div className="flex justify-between mt-3 max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-4 py-2 outline-none"
          value={searchText}
          onChange={handleSearch}
        />
        <button
          className="bg-[#592d02] text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          type="submit"
        >
          Search
        </button>
      </div>

      {/* products section here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 sm:px-7 my-6">
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
