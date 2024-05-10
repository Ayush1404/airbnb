'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logo = () => {
    const router = useRouter()
  return (
    <Image 
        onClick={()=>{router.push('/')}}
        src={'/images/logo.png'}
        alt='logo'
        className='hidden md:block cursor-pointer'
        height={100}
        width={100}
        priority
    />
  )
}

export default Logo