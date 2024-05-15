'use client'

import React, { useEffect } from 'react'
import EmptyState from './components/EmptyState'

type ErrorStateProps ={
    error :Error
}

const ErrorState:React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(()=>{
        console.log(error)
    },[error])
  return (
   <EmptyState 
        title='Something went wrong'
        subtitle='Looks like an error occured'
   />
  )
}

export default ErrorState