import Image from 'next/image'
import React from 'react'

function MyOrderItem({ item }) {
    console.log(item);
    return (
        <div className="w-[60%]">
            <div className='grid grid-cols-5  mt-3 items-center'>
                <Image src={item.product.data.attributes.images.data[0].attributes.url} alt="image" width={80} height={80} className="bg-gray-100 p-5 rounded-md border" />
                <div className="col-span-2">
                    <h2>{item.product.data.attributes.name}</h2>

                </div>
                <h2>Item Price: {item.amount}</h2>
                <h2>Quantity: {item.quantity}</h2>
                <div>

                </div>
            </div>
            <hr></hr>
        </div>

    )
}

export default MyOrderItem