import Image from 'next/image'
import React from 'react'

type AvatarProps ={
  src : string | null | undefined 
}
const Avatar:React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <div>
        <Image 
            src={ src || '/images/placeholder.jpeg'}
            alt='avatar'
            className='rounded-full'
            height={30}
            width={30}
            
        />
    </div>
  )
}

export default Avatar