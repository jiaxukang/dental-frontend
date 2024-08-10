"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ArrowBigRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';



function Checkout() {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [cartItemList, setCartItemList] = useState([]);
    const router = useRouter();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            setUser(user);
            setJwt(jwt);
            getTotalCartItem();
        } else {
            toast.error('Please login to continue');
            router.push('/sign-in');
        }
        return () => {
            // Cleanup function to clear data
            setUser(null);
            setJwt(null);
        };
    }, [jwt])

    const [subTotal, setSubTotal] = React.useState(0);
    useEffect(() => {
        let total = 0;
        cartItemList.forEach(item => {
            total += item.amount;
        });

        setSubTotal(total.toFixed(2));
        setTotalAmount((total * 1.09).toFixed(2));
        return () => {
            // Cleanup function to clear data
            setSubTotal(0);
            setTotalAmount(0);
        };
    }, [cartItemList])
    async function getTotalCartItem() {
        try {
            const cartItemList = await GlobalApi.getCarts(user?.id, jwt);
            setCartItemList(cartItemList);
            setTotalCartItem(cartItemList?.length);
        } catch (error) {
            toast.error('Something went wrong');
        }
    }

    async function createOrder() {
        const payload = {
            data: {
                user_id: user.id,
                username: userName,
                email: email,
                phone: phone,
                zip: zip,
                address: address,
                total_order_amount: totalAmount,
                orderItemList: cartItemList
            }

        }
        try {
            await GlobalApi.createOrder(payload, jwt);
            cartItemList.forEach(async (item) => {
                await GlobalApi.deleteCart(item.id, jwt);
            });
            toast('Order Created Successfully');
            router.replace('/order-confirm');
        } catch (error) {
            toast.error('Something went wrong');
        }

    }

    return (
        <div>
            <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">Checkout</h2>
            <div className="p-3 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
                <div className="md:col-span-2 mx-20">
                    <h2 className="font-bold text-3x">
                        Billing Details
                    </h2>
                    <div className="grid grid-cols-2 gap-10 mt-3">
                        <Input placeholder="Name" onChange={(e) => setUserName(e.target.value)} />
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-10 mt-3">
                        <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                        <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
                    </div>
                    <div className="mt-3">
                        <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

                    </div>

                </div>
                <div className="mx-10 border">
                    <h2 className="p-3 bg-gray-200 font-bold text-center">Total Cart {totalCartItem}</h2>
                    <div className="p-4 flex flex-col gap-4">
                        <h2 className="font-bold flex justify-between">Subtotal : <span>${subTotal}</span></h2>
                        <hr></hr>
                        <h2 className="flex justify-between">Tax (9%) : <span>${(subTotal * 0.09).toFixed(2)}</span></h2>
                        <hr></hr>
                        <h2 className="font-bold flex justify-between">Total : <span>${totalAmount}</span></h2>
                        <Button disabled={!(email || userName || phone)} onClick={() => createOrder()}>Create Order <ArrowBigRight /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout