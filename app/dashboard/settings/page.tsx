'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function Page(){
    const [qrCode, setQrcode] = useState('')
    const [secret, setSecret] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const setup2FA = async () => {
        try {
            const response = await fetch('/api/2fa/setup', {
                method: 'POST'
            })

            const data = await response.json()

            if (!response.ok){
                throw new Error(data.error)
            }

            setQrcode(data.qrCode)
            setSecret(data.secret)

            console.log(qrCode)

        } catch (error) {
            setError('Gagal mengatur 2FA.')
        }
    }

    const verify2FA = async () => {
        try {
            setError('')

            const response = await fetch('api/2fa/verify', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: verificationCode})
            })

            const data = await response.json()

            if (!response.ok){
                setError(data.error)
                throw new Error(data.error)
            }

            setSuccess('2FA berhasil diaktifkan')
            setQrcode('')
            setSecret('')
            setVerificationCode('')
        } catch (error) {
            console.log(error)
            setError('Kode verifikasi tidak valid')
        }
    }

    return(
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Pengaturan Two-Factor Authentication</h1>

            {
                !qrCode ? (
            <button onClick={setup2FA} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                Aktifkan 2FA
            </button>
                ) : (
            <div className="space-y-4">
                <div className="border p-4 rounded">
                    <p className="mb-2">Scan QR code ini dengan aplikasi authenticator.</p>
                    <Image src={qrCode} alt="QR Code" width={200} height={200} />
                    <p className="mt-2 text-sm w-full">
                        Atau masukkan kode ini secara manual:{secret}
                    </p>
                </div>

                <div>
                    <label className="block mb-2">
                        Masukkan kode verifikasi:
                    </label>

                    <input 
                        type="number"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="000000"
                    />
                    </div>

                    <button onClick={verify2FA} className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full">
                        Verifikasi
                    </button>
                    </div>
                )
            }

            {error && (
                <div className="mt-4 text-red-500">{error}</div>
            )}

            {success && (
                <div className="mt-4 text-green-500">{success}</div>
            )}
        </div>
    )
}