import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from './_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList';

async function ProductCategory({params}) {
    const productList = await GlobalApi.getProductByCategory(params.categoryName)
    const categoryList = await GlobalApi.getCategory();
  return (
      <div>
          <h2 className="p-4 bg-red-500 text-white font-bold text-3xl text-center">{params.categoryName}</h2>
          <TopCategoryList categoryList={categoryList.data.data} selectedCategory={params.categoryName} />
          <div className='p-5 md:10'>
              <ProductList productList={productList.data.data} />
          </div>
          
      </div>
  )
}

export default ProductCategory