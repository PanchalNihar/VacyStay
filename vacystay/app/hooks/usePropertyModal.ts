import {create} from "zustand"
interface AddPropertyStore{
    isOpen: boolean;
    open:()=>void;
    close:()=>void
}
const usePropertyModal=create<AddPropertyStore>((set)=>({
    isOpen:false,
    open:() =>set({isOpen:true}),
    close:() =>set({isOpen:false})
}))
export default usePropertyModal