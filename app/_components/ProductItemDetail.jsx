"use client"
import { Button } from '@/components/ui/button'
import { LoaderCircle, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react';
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ProductItemDetail({ product }) {
    const [productTotalPrice, setProductTotalPrice] = useState(
        product?.attributes?.sellingPrice ?
            product.attributes.sellingPrice :
            product.attributes.mrp
    );
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [size, setSize] = useState('small');
    const [sizeList, setSizeList] = useState(["small", "medium", "large"]);
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const { updateCart, setUpdateCart } = React.useContext(UpdateCartContext);

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (jwt) {
            setUser(user);
            setJwt(jwt);
        }
        return () => {
            // Cleanup function to clear data
            setUser(null);
            setJwt(null);
        };
    }, [jwt])

    async function addToCart() {
        setLoading(true);
        if (!jwt) {
            router.push('/sign-in');
            setLoading(false);
            return;
        }
        const data = {

            data: {
                quantity: quantity,
                amount: (quantity * productTotalPrice).toFixed(2),
                users_permissions_users: user.id,
                products: product.id,
                user_id: user.id,
                size: size,
            }

        }
        await GlobalApi.addToCart(data, jwt).then((res) => {
            toast("Added to Cart")
            setLoading(false);
            setUpdateCart(!updateCart);
        }, (e) => {
            toast("Error Adding to Cart")
            setLoading(false);
        })

    }

    function changeSize(_size) {
        setSize(_size);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
            <Image src={product?.attributes?.images?.data?.[0]?.attributes?.url} alt={product?.attributes?.name} width={300} height={300}
                className='bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg'
            />
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>
                    {product?.attributes?.name}
                </h2>
                <h2 className='text-sm text-gray'>
                    {product?.attributes?.description}
                </h2>
                <div className="flex gap-3">

                    {product?.attributes?.sellingPrice && <h2 className="font-bold text-2xl">&{product?.attributes?.sellingPrice}</h2>}
                    <h2 className={`font-bold text-2xl ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>
                        ${product?.attributes?.mrp}
                    </h2>
                </div>
                <h2 className='font-medium text-lg'>Quantity {product?.attributes?.itemQuantityType}</h2>
                <div className='font-medium text-lg'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <h2 className='hidden md:flex gap-2 items-center border rounded-full w-[40%] p-1 px-2 bg-slate-200 cursor-pointer'>
                                size: {size}
                            </h2>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuSeparator />
                            {
                                sizeList.map((_size) => (

                                    <DropdownMenuItem className='flex gap-2 items-center cursor-pointer' >

                                        <h2 className="text-lg" onClick={() => changeSize(_size)}>{_size}</h2>

                                    </DropdownMenuItem>

                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div className='flex flex-col items-baseline gap-3'>
                    <div className="flex gap-3 items-center">
                        <div className='p-2 border flex gap-10 items-center px-5'>
                            <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className="text-2xl font-bold">= ${(quantity * productTotalPrice).toFixed(2)}</h2>
                    </div>

                    <Button disable={loading} onClick={() => addToCart()} className="flex gap-3">
                        <ShoppingBasket />
                        {loading ? <LoaderCircle className="animate-top" /> : "Add To Cart"}
                    </Button>
                </div>
                <h2 className="flex gap-1">
                    <span className='font-bold'>Category: </span>
                    {product?.attributes?.categories?.data.map((category, index) => (
                        <p key={index}>{category.attributes.name}</p>
                    ))}
                </h2>
            </div>
        </div>
    )
}

export default ProductItemDetail