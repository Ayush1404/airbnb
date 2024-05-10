'use client'
import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import { useRentModal } from '../hooks/userRentModal copy'
import Heading from '../Heading'
import { categories } from '@/app/constants'
import CategoryInput from '../inputs/CategoryInput'
import {  FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE
}
const RentModal = () => {
    const router = useRouter()
    const rentModal = useRentModal()
    const [step,setStep] = useState(STEPS.CATEGORY)
    const [isLoading,setIsLoading]=useState(false)
    const onBack = () => {
        setStep((t)=>t-1)
    }
    const onNext = () => {
        setStep((t)=>t+1)
    }
    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        if(step !== STEPS.PRICE)
        {
            return onNext()
        }
        setIsLoading(false)

        axios.post('/api/listings',data)
        .then(()=>{
            toast.success("Listing added successfully")
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
        }).catch((err)=>{
            console.log(err)
            toast.error("Something went wrong")
        }).finally(()=>{
            setIsLoading(false)
        })
    }
    const actionLabel = useMemo(()=>{
        return (step === STEPS.PRICE) ? 'Create' : 'Next'
    },[step])
    const secondaryActionLabel = useMemo(()=>{
        return (step === STEPS.CATEGORY) ? undefined : 'Back'
    },[step])
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category :'',
            location:null,
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            imageSrc:'',
            title:'',
            description:'',
        }
    })
    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(()=>dynamic(()=>import('../Map'),{ssr:false}),[location])
    const setCustomValue =(id:string , value:any) =>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
    }
    let bodyContent =(
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Which of these best describes your place?'
                subtitle='Pick a category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item)=>(
                    <div className='col-span-1' key={item.label}>
                        <CategoryInput 
                            onClick={(category)=>setCustomValue('category' , category)}
                            selected={category===item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
    if(step === STEPS.LOCATION)
    {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Where is your place located?'
                    subtitle='Help guests find you'
                />
                <CountrySelect 
                    onChange={(value)=>{setCustomValue('location',value)}}
                    value={location}
                />
                <Map 
                    center={location?.latlng}
                />
            </div>
        )
    }
    if (step ===STEPS.INFO )
    {
      bodyContent=(
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Share some basics about your place'
                subtitle='What amenities do you have?'
            />
            <Counter 
                title='Guests'
                subtitle='How many guests can you accomodate?'
                value={guestCount}
                onChange={(val)=>{setCustomValue('guestCount',val)}}
            />
            <hr />
            <Counter 
                title='Rooms'
                subtitle='How many rooms do you have?'
                value={roomCount}
                onChange={(val)=>{setCustomValue('roomCount',val)}}
            />
            <hr />
            <Counter 
                title='Bathrooms'
                subtitle='How many bathrooms do you have?'
                value={bathroomCount}
                onChange={(val)=>{setCustomValue('bathroomCount',val)}}
            />
        </div>
      )  
    }
    if(step === STEPS.IMAGES)
    {
      bodyContent=(
        <div className='flex flex-col gap-6'>
            <Heading 
                title='Add a photo of your place'
                subtitle='Show guests what it looks like'
            />
            <ImageUpload 
                onChange={(value)=>{setCustomValue('imageSrc', value)}}
                value={imageSrc}
            />
        </div>
      )  
    }
    if(step === STEPS.DESCRIPTION)
    {
        bodyContent = (<div className='flex flex-col gap-8'>
            <Heading 
                title='How would you describe you place?'
                subtitle='Short and sweet works best!'
            />
            <Input
                id='title'
                label='Title'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <hr />
            <Input
                id='desrciption'
                label='Description'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>) 
    }
    if(step === STEPS.PRICE)
        {
            bodyContent = (<div className='flex flex-col gap-8'>
                <Heading 
                    title='Set your price'
                    subtitle='How much do you charge per night?'
                />
                <Input
                    id='price'
                    label='Price'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    type='number'
                    formatPrice
                />
            </div>) 
        }
    return (
        <Modal 
            title='Airbnb your home'
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabel}
            secondaryAction={step===STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal