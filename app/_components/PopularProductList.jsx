"use client"
import React from 'react'
import ProductItem from './ProductItem'

function PopularProductList({ productList }) {
  return (
    <div className="mt-5">
      <h2 className="text-red-600 font-bold text-2xl">Our Popular Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {
          productList?.map((product, index) => index < 8 && (
            <ProductItem key={index} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default PopularProductList