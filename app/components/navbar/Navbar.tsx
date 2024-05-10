'use client'
import Container  from '../Container'
import React from 'react'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Modal from '../modals/Modal'
import ClientOnly from '../ClientOnly'
import { User } from '@prisma/client'
import { SafeUser } from '@/app/types'
import Categories from './Categories'

type NavBarProps = {
  currentUser?: SafeUser | null
}
const Navbar:React.FC<NavBarProps> = ({
  currentUser
}) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                  <ClientOnly>
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser}/>
                  </ClientOnly>
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar