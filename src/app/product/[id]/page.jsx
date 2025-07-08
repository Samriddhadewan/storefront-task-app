"use client";

import Image from "next/image";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import toast from 'react-hot-toast'; 


export default function ProductDetailsPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const {addToCart} = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          
          throw new Error(`Product not found (status ${res.status})`);
        }
        const data = await res.json();
        setProduct(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch product");
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center mt-20 text-red-600">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p>{error}</p>
        
        <a href="/" className="text-blue-600 underline mt-4 inline-block">
          Go back to Home
        </a>
      </div>
    );

  const {
    title,
    brand,
    category,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    availabilityStatus,
    minimumOrderQuantity,
    returnPolicy,
    shippingInformation,
    warrantyInformation,
    sku,
    dimensions = {},
    weight,
    images = [],
    thumbnail,
    meta = {},
    tags = [],
    reviews = [],
  } = product;

  const finalPrice = (price - price * (discountPercentage / 100)).toFixed(2);

  
  const handleAddToCart = () => {
    addToCart(product, minimumOrderQuantity);
    setIsInCart(true);
    toast.success("Product added to the cart")
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md my-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="flex-1">
          <Image
            src={images[0] || thumbnail}
            alt={title}
            width={400}
            height={400}
            className="rounded-md object-contain"
            priority
          />
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {images.map((imgUrl, i) => (
              <Image
                key={i}
                src={imgUrl}
                alt={`${title} ${i + 1}`}
                width={60}
                height={60}
                className="rounded-md border cursor-pointer object-contain"
              />
            ))}
          </div>
        </div>

      
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-sm text-gray-600 mb-1">
              Brand: <span className="font-medium">{brand}</span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Category: <span className="font-medium">{category}</span>
            </p>

            <p className="mb-4 text-gray-800">{description}</p>

            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-semibold text-red-600">
                ${finalPrice}
              </p>
              <p className="line-through text-gray-400">${price.toFixed(2)}</p>
              <p className="text-green-600 font-semibold">
                {discountPercentage}% OFF
              </p>
            </div>

            <p className="mb-1">
              Rating:{" "}
              <span className="font-semibold text-yellow-500">{rating} ⭐</span>
            </p>

            <p className="mb-1">
              Availability:{" "}
              <span
                className={`font-semibold ${
                  availabilityStatus === "In Stock"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {availabilityStatus}
              </span>
            </p>

            <p className="mb-1">
              Stock: <span className="font-semibold">{stock}</span>
            </p>

            <p className="mb-1">
              Minimum Order Quantity:{" "}
              <span className="font-semibold">{minimumOrderQuantity}</span>
            </p>

            <p className="mb-4">
              SKU: <span className="font-mono text-gray-700">{sku}</span>
            </p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Product Details:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Dimensions: {dimensions.width ?? "-"}cm (W) ×{" "}
                  {dimensions.height ?? "-"}cm (H) × {dimensions.depth ?? "-"}cm
                  (D)
                </li>
                <li>Weight: {weight ?? "-"}g</li>
                <li>Return Policy: {returnPolicy ?? "-"}</li>
                <li>Shipping Info: {shippingInformation ?? "-"}</li>
                <li>Warranty: {warrantyInformation ?? "-"}</li>
                <li>Barcode: {meta.barcode ?? "-"}</li>
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Tags:</h3>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="font-semibold mb-3">
                Reviews ({reviews.length}):
              </h3>
              <ul className="space-y-3 max-h-48 overflow-y-auto">
                {reviews.map((review, i) => (
                  <li
                    key={i}
                    className="border border-gray-300 p-3 rounded-md bg-gray-50"
                  >
                    <p className="font-semibold">
                      {review.user || "Anonymous"}
                    </p>
                    <p className="text-yellow-500">{review.rating} ⭐</p>
                    <p className="text-gray-700">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
            onClick={handleAddToCart}
            
          >
            Add to Cart - ${finalPrice}
          </button>
          <Link
            href="/cart"
            className="mt-2 flex justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300 "
          >
            <p className=" inline-block">Buy Now</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
