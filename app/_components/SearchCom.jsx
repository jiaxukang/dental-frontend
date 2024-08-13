"use client"

import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react'
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


export default function SearchCom() {

    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((e) => {

        const term = e.target.value.trim();

        // Only proceed if the Enter key is pressed

        if (e.key === 'Enter') {
            replace(`/search/${term}`);
        }
    }, 300);

    return (
        <div className='md:flex gap-3 items-center border rounded-full p-2 px-5'>
            <Search />
            <Input
                type="text"
                placeholder="Search"

                onKeyUp={(e) => handleSearch(e)}
            />
        </div>
    );
}