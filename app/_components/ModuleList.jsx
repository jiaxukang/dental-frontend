"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ModuleList({ moduleList }) {
    return (
        <div className='mt-5'>
            <h2 className="text-red-600 font-bold text-2xl">
                Shop by Module
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
                {
                    moduleList?.map((category, index) => (
                        <Link href={'/module/' + category.attributes.name} key={index} className='flex flex-col items-center bg-red-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-red-200'>
                            <Image src={
                                category?.attributes?.icon?.data?.[0]?.attributes?.url}
                                alt={category?.attributes?.name}
                                width={50}
                                height={50}
                                className="group-hover:scale-125 transition-all ease-in-out"
                            />
                            <h2 className="text-red-800">{category?.attributes?.name}</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ModuleList