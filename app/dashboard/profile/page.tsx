import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link';
import LogoutButton from '@/components/logout-button';
import '../../global.css';

export default async function Page(){
    const session = await getSession()

    if (!session || !session.user || !session.user.email){
        redirect('auth/login')
    }    
     return(
        <div className="max-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Informasi Akun</h2>
                <div className="space-y-2">
                    <p><strong>Nama: </strong>{session?.user.name}</p>
                    <p><strong>Email: </strong>{session?.user.email}</p>
                    
                    <p>
                        <strong>Status 2FA:</strong>
                        {
                            session?.user.twoFactorEnabled ? (
                                <span className="text-green-500 font-semibold"> Aktif</span>
                            ) : (<span className="text-red-500 font-semibold"> Tidak Aktif</span>
                            )
                        }
                    </p>
                    {
                        !session.user.twoFactorEnabled && (
                            <div className="mt-6">
                                <Link 
                                    className="bg-blue-500 text-white px-4 py-2"
                                    href={'/dashboard/settings'}>
                                    Aktifkan 2FA
                                </Link>    
                            </div>
                        )
                    }
                    <LogoutButton/>
                </div>
            </div>
        </div>
    )
}