'use client'
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import { useRegisterModal } from '../hooks/userRegisterModal'
import { useLoginModal } from '../hooks/userLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { useRentModal } from '../hooks/userRentModal copy'

type UserMenuProps = {
  currentUser?: SafeUser | null
}
const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const [ isOpen , setIsOpen ] = useState(false)
  const rentModal = useRentModal()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const toggleOpen = () =>{
    setIsOpen(t=>!t)
  }
  const onRent =useCallback(()=>{
    if(!currentUser)
    {
      loginModal.onOpen()
      return;
    }
    rentModal.onOpen()
  },[currentUser,loginModal,rentModal])
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div 
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Airbnb your home
        </div>
        <div 
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && <div className='absolute rounded-md shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm '>
        <div className='flex flex-col cursor-pointer'>
          {currentUser ?(
          <>
            <MenuItem 
              onClick={()=>{}} 
              label='My trips'
            />
            <MenuItem 
              onClick={()=>{}} 
              label='My favourites'
            />
            <MenuItem 
              onClick={()=>{}} 
              label='My reservations'
            />
            <MenuItem 
              onClick={()=>{}} 
              label='My properties'
            />
            <MenuItem 
              onClick={onRent}
              label='Airbnb my home'
            />
            <hr/>
            <MenuItem 
              onClick={()=> signOut()} 
              label='Logout'
            />
          </>
          ):(
          <>
            <MenuItem 
              onClick={loginModal.onOpen} 
              label='Login'
            />
            <MenuItem 
              onClick={registerModal.onOpen} 
              label='Signup'
            />
          </>
          )}
        </div>
      </div>}
    </div>
  )
}

export default UserMenu