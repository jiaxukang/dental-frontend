"use client"
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import ProductList from '@/app/_components/ProductList';
//import { getSummaries } from "@/data/loaders";
//import { Search } from "@/components/custom/Search";



export default function searchName(
    { params }
) {

    // const result = await GlobalApi.useFetch("/products?filters[name][$containsi]=" + params.searchParams + "&populate=*");
    // console.log(params.searchParams);
    const [result, setResult] = useState(null);

    async function fetchData() {
        const _result = await GlobalApi.useFetch("/products?filters[name][$containsi]=" + params.searchParams + "&populate=*");
        setResult(_result);
    }

    useEffect(() => {

        fetchData();
    }, []);

    return (
        <div>
            <div className='p-5 md:10'>

                <ProductList productList={result?.data.data} />
            </div>
        </div>
    );
}