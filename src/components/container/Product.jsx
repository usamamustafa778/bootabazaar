import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4" key={product?.slug}>
      <Link to={`/product/${product?.slug}`}>
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-48 object-cover rounded-lg bg-black"
        />
      </Link>
      <div className="mt-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800">
            {product?.name}
          </h3>
        </Link>
        <Rating rating={product?.rating} numReviews={product?.numReviews} />
        <div className="flex justify-between items-center my-2">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
          <Link
            to={`/seller/${product?.seller?._id}`}
            className="text-blue-500"
          >
            {product?.seller?.seller?.name}
          </Link>
        </div>
        {product.countInStock === 0 ? (
          <button
            className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg mt-2 cursor-not-allowed"
            disabled
          >
            Out of stock
          </button>
        ) : (
          <button
            // onClick={() => addToCartHandler(product)}
            className="w-full py-2 bg-blue-600 text-white rounded-lg mt-2 hover:bg-blue-700"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
