"use client";

import { useState, React } from "react";
import { useRouter } from "next/navigation";


export default function Page(){
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleCredentialSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            })

            const data = await response.json()

            if (!response.ok){
                throw new Error(data.error || "Terjadi kesalahan.")
            }

            router.push('/auth/login')

        } catch (error) {
            setError(error instanceof Error ? error.message: 'Terjadi kesalahan.')
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <form onSubmit={handleCredentialSubmit} className="space-y-4 w-full max-w-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <div>
                    <label className="block mb-2">Name</label>
                    <input 
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>

                <div>
                    <label className="block mb-2">Email</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border-gray-200 rounded"
                    required
                    />
                </div>

                <div>
                    <label className="block mb-2">Password</label>
                    <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border-gray-200 rounded"
                    required
                    />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button 
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-800">
                    Lanjutkan
                </button>
            </form>
        </div>
    )
}