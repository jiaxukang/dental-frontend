"use client";
import { Button } from '@/components/ui/button'
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import CartItemList from './CartItemList';
import { toast } from 'sonner';
import SearchCom from './SearchCom';



function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const [moduleList, setModuleList] = useState([]);
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [cartItemList, setCartItemList] = useState([]);
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const router = useRouter();
    const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            setUser(user);
            setJwt(jwt);
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        getTotalCartItem();
        return () => {
            // Cleanup function to clear data
            setUser(null);
            setJwt(null);
        };
    }, [jwt, updateCart])

    useEffect(() => {
        getModuleList();
        return () => {
            // Cleanup function to clear data
            getModuleList([]);
        };
    }, [])

    const [subTotal, setSubTotal] = React.useState(0);
    useEffect(() => {
        let total = 0;
        cartItemList.forEach(item => {
            total += item.amount;
        });
        setSubTotal(total.toFixed(2));
        return () => {
            // Cleanup function to clear data
            setSubTotal(0);
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

    function onSignOut() {
        sessionStorage.clear();
        router.push('/sign-in');
    }

    async function getModuleList() {
        try {
            const response = await GlobalApi.getModule();
            setModuleList(response.data.data);
        } catch (error) {
            toast(error);
        }
    }

    async function onDeleteItem(id) {
        await GlobalApi.deleteCart(id, jwt).then(() => {
            getTotalCartItem();
            toast('Item Deleted Successfully');
        })
    }
    return (
        <div className='p-5 shadow-md flex justify-between'>
            <div className='flex items-center gap-8'>
                <Link href="/"><Image src="/snake-1.png" alt="logo" width={100} height={100} className="cursor-pointer" /></Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                            <LayoutGrid className='h-5 w-5' />Category
                        </h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>All categories</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            moduleList.map((category) => (
                                <Link key={category?.id} href={'/module/' + category.attributes.name}>
                                    <DropdownMenuItem className='flex gap-2 items-center cursor-pointer'>

                                        <Image src={
                                            category?.attributes?.icon?.data?.[0]?.attributes?.url}
                                            alt={category?.attributes?.name}
                                            width={30}
                                            height={30}
                                            unoptimized={true} />
                                        <h2 className="text-lg">{category?.attributes?.name}</h2>


                                    </DropdownMenuItem>
                                </Link>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                <SearchCom />

                {/* <div className='md:flex gap-3 items-center border rounded-full p-2 px-5'>
                    <Search />
                    <input type="text" placeholder="Search" className='outline-none' />
                </div> */}
            </div>
            <div className='flex gap-5 items-center'>

                <Sheet>
                    <SheetTrigger>
                        <h2 className='flex gap-2 items-center text-lg'><ShoppingBag /><span className="bg-red-300 px-2 rounded-full">
                            {totalCartItem}</span>
                        </h2>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="bg-primary text-white font-bold text-lg p-2">My Cart</SheetTitle>
                            <SheetDescription>
                                <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />
                            </SheetDescription>
                        </SheetHeader>
                        <SheetClose asChild>
                            <div className="absolute w-[90%] bottom-6 flex flex-col">
                                <h2 className="text-lg font-bold flex justify-between">Subtotal <span>${subTotal}</span></h2>
                                <Button onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}>Checkout</Button>
                            </div>
                        </SheetClose>
                    </SheetContent>
                </Sheet>


                {
                    isAuth ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><CircleUserRound className='bg-red-300 h-8 w-8 rounded-full cursor-point' /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <Link href={"/my-order"}><DropdownMenuItem>My order</DropdownMenuItem></Link>
                                <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <Link href="/sign-in">
                            <Button>Sign in</Button>
                        </Link>
                }


            </div>
        </div>
    )
}

export default Header;