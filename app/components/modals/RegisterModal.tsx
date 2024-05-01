'use client'

import { useState } from "react"
import { useRegisterModal } from "../hooks/userRegisterModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-toastify"
import Button from "../Button"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"

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
    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        axios.post('/api/register', data)
        .then(()=>{
            registerModal.onClose()
        })
        .catch((err)=>{
            toast.error(err.message)
            console.log(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
        
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welocome to Airbnb" subtitle="Create an account !"/>
            <Input id="email" label="Email" type="email" register={register} disabled={isLoading} errors={errors} required/>
            <Input id="name" label="Name" register={register} disabled={isLoading} errors={errors} required/>
            <Input id="password" label="Password" type="password" register={register} disabled={isLoading} errors={errors} required/>
        </div>  
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline 
                label="Continue with google"
                icon={FcGoogle}
                onClick={()=>{}}
            />
            <Button
                outline 
                label="Continue with github"
                icon={AiFillGithub}
                onClick={()=>{}}
            />
            <div className="text-neutral-500 justify-center  items-center mt-3 font-light">
                <div className="flex flex-row items-center gap-2"> 
                    <div> Already have an account ? </div>
                    <div 
                        className="text-blue-700 hover:underline cursor-pointer"
                        onClick={registerModal.onClose}
                    > 
                        Login 
                    </div>

                </div>
                
            </div>
        </div>
    )
    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal