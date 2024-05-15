import { create } from "zustand";

interface LoginModalStore {
    isOpen : boolean,
    onOpen : () => void ,
    onClose: () => void
}

export const useSearchModal = create<LoginModalStore>((set)=>({
    isOpen :false ,
    onOpen : () =>{
        set({isOpen:true})
    },
    onClose : () =>{
        set({isOpen:false})
    }
}))