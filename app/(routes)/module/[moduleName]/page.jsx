"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { useEffect, useState } from 'react'
import TopModuleList from './_components/TopModuleList'
import { toast } from 'sonner';

function modulelList({ params }) {
    const [moduleList, setModuleList] = useState(null);

    useEffect(() => {
        fetchModule();
        return () => {
            setModuleList(null);
        }
    }, []);



    async function fetchModule() {
        try {
            const response = await GlobalApi.getModule();
            setModuleList(response);
        } catch (error) {
            toast("Failed to fetch category list");
        }
    }


    return (
        <div>
            <h2 className="p-4 bg-red-500 text-white font-bold text-3xl text-center">{decodeURIComponent(params.moduleName)}</h2>
            <TopModuleList moduleList={moduleList?.data?.data} selectedModule={params.moduleName} />
        </div>
    )
}

export default modulelList