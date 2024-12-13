import NewsTable from "@/components/news/news-table";
import { authOptions } from "@/lib/auth";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";
import Link from 'next/link';

export default async function Page(){
    const session = await getServerSession(authOptions)

    if (!session){
        redirect("auth/login")
    }

    const news = await prisma.news.findMany({
        include:{
            category: true,
        },
        orderBy: { createdAt: "desc"},
    })

    return(
        <div className="container mx-auto py-10 px-6">
            <NewsTable news={news || []}/>
            <div className="mt-6 text-right">
                <Link
                    href="/dashboard/profile"
                    className="bg-black hover:bg-gray-600 text-white px-6 py-2 rounded-md">
                    Profile
                </Link>
            </div>
        </div>
)
}