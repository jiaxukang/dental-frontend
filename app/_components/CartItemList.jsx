"use client"
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react';

function CartItemList({ cartItemList, onDeleteItem }) {



    return (
        <div>
            <div className="h-[750px] overflow-auto">
                {cartItemList.map((item, index) => {
                    return (
                        <div key={index} className="flex justify-between items-center p-2 mb-5">
                            <div className="flex gap-6 items-center">
                                <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + item.image} alt={item.name} width={70} height={70} className="border p-2" />
                                <div>
                                    <h2 className="font-bold">{item.name}</h2>
                                    <h2 className="">Quantity {item.quantity}</h2>
                                    <h2 className="text-lg font-bold">$ {item.amount}</h2>
                                </div>

                            </div>
                            <Trash2Icon onClick={() => onDeleteItem(item.id)} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CartItemList