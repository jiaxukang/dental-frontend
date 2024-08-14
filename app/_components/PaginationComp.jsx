"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";

import PaginationArrow from "./PaginationArrow";



export function PaginationComponent({ pageCount }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;


    const createPageURL = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };



    return (
        <div className="mt-5"> <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationArrow
                        direction="left"
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1}
                    />
                </PaginationItem>
                <PaginationItem>
                    <span className="p-2 font-semibold text-gray-500">
                        Page {currentPage}
                    </span>
                </PaginationItem>
                <PaginationItem>
                    <PaginationArrow
                        direction="right"
                        href={createPageURL(currentPage + 1)}
                        isDisabled={currentPage >= pageCount}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination></div>

    );
}