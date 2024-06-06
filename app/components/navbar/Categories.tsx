'use client'
import React, { Suspense } from 'react'
import Container from '../Container'
import { categories } from '@/app/constants'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

const Categories = () => {
    const params =useSearchParams();
    const category = params?.get('category')
    const pathname = usePathname()
    const isMainPage = pathname ==='/'

    if(!isMainPage) return null
    return (
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto '>
                {categories.map((item)=>(
                    <Suspense key={item.label}>
                        <CategoryBox 
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={category===item.label}
                        />
                    </Suspense> 
                ))}
            </div>
        </Container>
    )
}

export default Categories