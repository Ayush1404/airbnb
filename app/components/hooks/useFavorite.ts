import { SafeUser } from "@/app/types"
import { useRouter } from "next/navigation"
import { useLoginModal } from "./userLoginModal"
import { useCallback, useMemo } from "react"
import axios from "axios"
import { Bounce, toast } from "react-toastify"

type IUseFavorite ={
    listingId :string 
    currentUser? : SafeUser | null
}


const useFavorite = ({
    listingId,
    currentUser
}:IUseFavorite)=>{
    const router = useRouter()
    const loginModal = useLoginModal()
    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIDs || []
        return list.includes(listingId)
    },[listingId,currentUser])
    const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if(!currentUser) return loginModal.onOpen()
        try{
            let request;

            if(hasFavorited){
                request= () => axios.delete(`/api/favorites/${listingId}`)
            }
            else{
                request= () => axios.post(`/api/favorites/${listingId}`)
            }
            await request()
            router.refresh()
            toast.success('Added to favourites', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }catch(err){
            toast.error('Something went wrong')
        }
    },[currentUser,loginModal,hasFavorited,router,listingId,axios])

    return{ 
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite