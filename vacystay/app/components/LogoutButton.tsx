'use client';
import { useRouter } from "next/navigation";
import { resetAuthCookies } from "../lib/actions";
import MenuLink from "./navbar/MenuLink";
import React from "react";
const LogoutButton:React.FC =()=>{
    const router=useRouter()

    const submitLogout= async()=>{
        console.log('clicked')
        resetAuthCookies();
        router.push('/')
    }
    return(
        <MenuLink
        label="logout"
        onClick={submitLogout}>
        </MenuLink>
    )
}

export default LogoutButton