import Link from "next/link"

export default function ProductCard({ product }) {
  const {
    id,
    thumbnail,
    title,
    price,
    discountPercentage,
    stock,
    brand,
    rating,
  } = product

  const finalPrice = (price - price * (discountPercentage / 100)).toFixed(2)

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition p-5">
      <img src={thumbnail} alt={title} className="w-full  h-52 object-contain rounded" />
      
      <div className="mt-3">
        <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-500">{brand}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-700 font-bold">${finalPrice}</span>
          {discountPercentage > 0 && (
            <span className="line-through text-gray-400 text-sm">${price}</span>
          )}
        </div>

        <p className="text-sm text-yellow-500">⭐ {rating.toFixed(1)}</p>

        <p className={`text-sm mt-1 ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <Link href={`/product/${id}`}>
          <button className="mt-3 w-full bg-[#592D02] text-white py-1 rounded">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}
