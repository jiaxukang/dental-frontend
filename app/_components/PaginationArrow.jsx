"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function PaginationArrow({
    direction,
    href,
    isDisabled,
}) {

    const isLeft = direction === "left";
    const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";
    const router = useRouter();

    const handleClick = (e) => {
        if (!isDisabled) {
            router.push(href);
        }
        // Prevent default if disabled
        e.preventDefault();
    };

    return (
        <Button
            onClick={handleClick}
            className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName}`}
            aria-disabled={isDisabled}
            disabled={isDisabled}
        >
            {isLeft ? "«" : "»"}
        </Button>
    );
};
