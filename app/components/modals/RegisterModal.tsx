'use client'

import { useState } from "react"
import { useRegisterModal } from "../hooks/userRegisterModal"
import { FieldValues, useForm } from "react-hook-form"

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading,setIsLoading] = useState(false)
    const { register , handleSubmit , formState :{ errors } } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })
    return (
        <div>
            
        </div>
    )
}

export default RegisterModal