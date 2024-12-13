'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton(){
    const handleLogout = async () => (
        await signOut()
    )
    
    return(
        <button
            onClick={handleLogout}
            className="bg-red-500 px-6 py-2 text-white rounded"
        >
            Logout
        </button>
    )
}