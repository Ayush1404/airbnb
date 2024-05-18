import React, { Suspense } from 'react'
import Loader from './components/Loader'

const Loading = () => {
  return (
    <Suspense>
      <Loader />
    </Suspense>
   
  )
}

export default Loading