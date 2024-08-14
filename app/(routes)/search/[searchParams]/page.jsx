"use client"
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import ProductList from '@/app/_components/ProductList';
import { useSearchParams } from "next/navigation";
//import { getSummaries } from "@/data/loaders";
//import { Search } from "@/components/custom/Search";



export default function searchName(
    { params }
) {
    const [result, setResult] = useState(null);
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    async function fetchData() {
        const _result = await GlobalApi.useFetch("/products?filters[name][$containsi]=" + params.searchParams + "&sort=createdAt:desc&pagination[page]=" + currentPage + "&pagination[pageSize]=8&populate=*");
        setResult(_result);
    }

    useEffect(() => {


        fetchData();
    }, [currentPage]);

    return (
        <div>
            <div className='p-5 md:10'>

                <ProductList productList={result?.data.data} pageCount={result?.data.meta.pagination.pageCount} />
            </div>
        </div>
    );
}