"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { useEffect, useState } from 'react'
import TopCategoryList from './_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

function ProductCategory({ params }) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const [productList, setProductList] = useState(null);
    const [categoryList, setCategoryList] = useState(null);

    async function fetchData() {
        const _result = await GlobalApi.useFetch("/products?filters[categories][name][$in]=" + params.categoryName + "&sort=createdAt:desc&pagination[page]=" + currentPage + "&pagination[pageSize]=8&populate=*");
        setProductList(_result);
    }

    useEffect(() => {
        fetchCategory();
        return () => {
            setCategoryList(null);
        }
    }, []);

    useEffect(() => {
        fetchData();
        return () => {
            setProductList(null);
        }
    }, [currentPage]);

    async function fetchCategory() {
        try {
            const response = await GlobalApi.getCategory();
            setCategoryList(response);
        } catch (error) {
            toast("Failed to fetch category list");
        }
    }


    return (
        <div>
            <h2 className="p-4 bg-red-500 text-white font-bold text-3xl text-center">{decodeURIComponent(params.categoryName)}</h2>
            <TopCategoryList categoryList={categoryList?.data?.data} selectedCategory={params.categoryName} />
            <div className='p-5 md:10'>
                <ProductList productList={productList?.data?.data} pageCount={productList?.data.meta.pagination.pageCount} />
            </div>

        </div>
    )
}

export default ProductCategory