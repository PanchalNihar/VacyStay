"use client";
interface MenuLinkProps{
    label:String;
    onClick:()=>void
} 
const MenuLink:React.FC<MenuLinkProps>=({label,onClick})=>{
    return(
        <div onClick={onClick}
        className="px-4 py-5 hover:bg-gray-100 transition cursor-pointer">
            {label}
        </div>
    )
}
export default MenuLink