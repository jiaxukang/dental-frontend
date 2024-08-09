"use client"

import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { toast } from 'sonner';
import moment from 'moment';
import MyOrderItem from '@/app/_components/MyOrderItem';


function MyOrder() {
    const [jwt, setJwt] = useState(null);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!jwt) {
            router.push('/sign-in');
        }
        setUser(user);
        setJwt(jwt);
        getOrders();
    }, [jwt])

    async function getOrders() {
        try {
            const _orders = await GlobalApi.getOrder(user.id, jwt);
            setOrders(_orders);
        } catch (error) {
            toast.error('Something went wrong');
        }
    }

    return (
        <div>
            <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">My Order</h2>
            <div className="py-8 mx-7 md:mx-20">
                <h2 className="text-3xl font-bold text-primary">Order History</h2>
                <div className="mt-10">
                    {
                        orders.map((order, index) => {
                            return (
                                <Collapsible key={index}>
                                    <CollapsibleTrigger>
                                        <div className='border p-2 bg-slate-100 flex gap-24 mt-3'>

                                            <h2><span className='font-bold mr-2'>Order Date: </span> {moment(order?.createdAt).format('DD/MMM/yyy')}</h2>
                                            <h2><span className='font-bold mr-2'>Total Amount:</span> {order?.total_order_amount}</h2>
                                            <h2><span className='font-bold mr-2'>Status:</span> {order?.status}</h2>
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        {order?.orderItemList.map((item, index) => {
                                            return (
                                                <MyOrderItem key={index} item={item} />
                                            )
                                        })}
                                    </CollapsibleContent>
                                </Collapsible>
                            )
                        })
                    }

                </div>


            </div>
        </div>
    )
}

export default MyOrder