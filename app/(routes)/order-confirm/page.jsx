"use client"
import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

function OrderConfirm() {
    const router = useRouter();
    function jumpToHome() {
        router.push('/my-order');
    }
    return (
        <div>
            <div className="flex justify-center my-20">
                <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32">
                    <CheckCircle2 className="h-24 w-24 text-primary" />
                    <h2 className="font-medium text-3xl text-primary">Order Successfully</h2>
                    <h2>Thank you so much for your order</h2>
                    <Button className="mt-5" onClick={() => jumpToHome()}>Track your Order</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm