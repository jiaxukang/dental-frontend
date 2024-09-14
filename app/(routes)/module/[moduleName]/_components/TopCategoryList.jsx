
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useSearchParams } from 'next/navigation';
import ProductList from '@/app/_components/ProductList';

function TopCategoryList({ categoryList }) {
    const [selectedCategory, setSelectedCategory] = useState('Category');
    const [productList, setProductList] = useState(null);
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    async function fetchData() {
        const _result = await GlobalApi.useFetch("/products?filters[categories][name][$in]=" + selectedCategory + "&sort=createdAt:desc&pagination[page]=" + currentPage + "&pagination[pageSize]=8&populate=*");

        console.log(_result);
        setProductList(_result);
    }

    useEffect(() => {
        fetchData();
        return () => {
            setProductList(null);
        }
    }, [currentPage, selectedCategory]);

    function handleName(category) {
        setSelectedCategory(category.attributes.name);
    }

    return (
        <div>
            <h2 className="p-2 mt-3 bg-red-400 text-white font-bold text-3xl text-center">{decodeURIComponent(selectedCategory)}</h2>
            <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-200 justify-center">
                {
                    categoryList?.map((category, index) => (
                        <div onClick={() => handleName(category)} key={index} className={`flex flex-col items-center bg-red-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-red-200 w-[150px] min-w-[100px] ${selectedCategory === category.attributes.name && ' bg-red-500 text-white'}`}>
                            <Image src={
                                category?.attributes?.icon?.data?.[0]?.attributes?.url}
                                alt={category?.attributes?.name}
                                width={50}
                                height={50}
                                className="group-hover:scale-125 transition-all ease-in-out"
                            />
                            <h2 className={`text-red-800  text-wrap w-32 overflow-hidden  text-center group-hover:text-white ${selectedCategory == category.attributes.name && ' text-white'}`}>{category?.attributes?.name}</h2>
                        </div>
                    ))
                }
            </div>
            <div className='p-5 md:10'>
                <ProductList productList={productList?.data?.data} pageCount={productList?.data.meta.pagination.pageCount} />
            </div>
        </div>
    )
}

export default TopCategoryList