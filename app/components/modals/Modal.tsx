'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button'
import { BiSearch } from 'react-icons/bi'

type ModalProps ={
  isOpen? :boolean,
  onClose :()=>void,
  onSubmit:()=>void,
  title?:string,
  body?:React.ReactElement,
  footer?:React.ReactElement,
  actionLabel:string,
  disabled?:boolean,
  secondaryAction?:()=>void,
  secondaryLabel?:string
}
const Modal :React.FC<ModalProps> = (
  {
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel
  }
) => {
  const [showModal,setShowModal]=useState(isOpen)
  
  useEffect(()=>{
    setShowModal(isOpen)
  },[isOpen])

  const handleClose = useCallback(()=>{
    if(disabled) return;
    setShowModal(false)
    setTimeout(onClose,300)
  },[disabled,onClose])
  
  const handleSubmit = useCallback(()=>{
    if(disabled) return;
    onSubmit();
  },[disabled,onSubmit])

  const handleSecondaryAction = useCallback(()=>{
    if(disabled || !secondaryAction) return 
    secondaryAction()
  },[disabled,secondaryAction])

  if(!isOpen) return null;
  
  return (
    <>
      <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 '>
       <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto'>
        <div className={`translate duration-300 h-full ${showModal?'translate-y-0 opacity-100':'translate-y-full opacity-0'}`}>
          {/* content */}
          <div className='translate h-full md:h-auto lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/* header */}
            <div className='flex items-center justify-center p-6 rounded-t relative border-b-[1px]'>
              <button 
                onClick={handleClose}
                className='p-1 border-0 hover:opacity-70 transition absolute left-9 '>
                <IoMdClose size={18} />
              </button>
              <div className='text-lg font-semibold'>
                {title}
              </div>
            </div>
            {/* body */}
            <div className='relative p-6 flex-auto'>
              {body}
            </div>
            {/* footer */}
            <div className='flex flex-col p-6 gap-2'>
              <div className='flex flex-row items-center gap-4 w-full'>
                {secondaryAction && secondaryLabel && (
                  <Button outline label={secondaryLabel} onClick={handleSecondaryAction} disabled={disabled} />
                )}
                <Button label={actionLabel} onClick={handleSubmit} disabled={disabled} />
              </div>
              {footer}
            </div>
          </div>
        </div>
       </div>
      </div>
    </>
  )
}

export default Modal