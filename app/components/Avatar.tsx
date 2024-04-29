import Image from 'next/image'
import React from 'react'

const Avatar = () => {
  return (
    <div>
        <Image 
            src={'/images/placeholder.jpeg'}
            alt='avatar'
            className='rounded-full'
            height={30}
            width={30}
            
        />
    </div>
  )
}

export default Avatar