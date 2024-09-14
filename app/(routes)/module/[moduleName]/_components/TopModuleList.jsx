
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import TopCategoryList from './TopCategoryList'

function TopModuleList({ moduleList, selectedModule }) {
    const [clickName, setClickName] = useState(selectedModule);
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const [categoryList, setCategoryList] = useState(null);

    async function fetchData() {
        const category = await GlobalApi.useFetch("/categories?filters[modules][name][$in]=" + clickName + "&populate=*");
        const _result = await GlobalApi.useFetch("/products?filters[categories][name][$in]=" + clickName + "&sort=createdAt:desc&pagination[page]=" + currentPage + "&pagination[pageSize]=8&populate=*");

        setCategoryList(category);
    }

    useEffect(() => {
        fetchData();
        return () => {
            setCategoryList(null);
        }
    }, [currentPage, clickName]);



    function handleClickName(module) {
        setClickName(module.attributes.name);
    }
    return (
        <div>
            <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-200 justify-center">
                {
                    moduleList?.map((module, index) => (
                        <Link onClick={() => handleClickName(module)} href={'/module/' + module.attributes.name} key={index} className={`flex flex-col items-center bg-red-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-red-200 w-[150px] min-w-[100px] ${selectedModule === module.attributes.name && ' bg-red-500 text-white'}`}>
                            <Image src={
                                module?.attributes?.icon?.data?.[0]?.attributes?.url}
                                alt={module?.attributes?.name}
                                width={50}
                                height={50}
                                className="group-hover:scale-125 transition-all ease-in-out"
                            />
                            <h2 className={`text-red-800  text-wrap w-32 overflow-hidden  text-center group-hover:text-white ${selectedModule == module.attributes.name && ' text-white'}`}>{module?.attributes?.name}</h2>
                        </Link>
                    ))
                }
            </div>
            <TopCategoryList categoryList={categoryList?.data?.data} />
        </div>
    )
}

export default TopModuleList