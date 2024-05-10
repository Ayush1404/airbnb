'use client'

import { useState } from "react"
import { useLoginModal } from "../hooks/userLoginModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-toastify"
import Button from "../Button"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { useRegisterModal } from "../hooks/userRegisterModal"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const { register , handleSubmit , formState :{ errors } } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        signIn('credentials',{
            ...data,
            redirect:false
        }).then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success("Logged in succefully!")
                router.refresh()
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
        
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welocome back" subtitle="Login to your account"/>
            <Input id="email" label="Email" type="email" register={register} disabled={isLoading} errors={errors} required/>
            <Input id="password" label="Password" type="password" register={register} disabled={isLoading} errors={errors} required/>
        </div>  
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            {/* <hr/>
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
            /> */}
            <div className="text-neutral-500 justify-center  items-center mt-3 font-light">
                <div className="flex flex-row items-center gap-2"> 
                    <div> Don't have an account ? </div>
                    <div 
                        className="text-blue-700 hover:underline cursor-pointer"
                        onClick={()=>{
                            loginModal.onClose();
                            registerModal.onOpen();
                        }}
                    > 
                        Register 
                    </div>

                </div>
                
            </div>
        </div>
    )
    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal