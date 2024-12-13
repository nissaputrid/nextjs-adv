import NewsTable from "@/components/news/news-table";
import { authOptions } from "@/lib/auth";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";
import '../global.css';

export default async function Page(){
    const session = await getServerSession(authOptions)

    if (!session){
        redirect("auth/login")
    }

    const news = await prisma.news.findMany({
        where:{
            authorId: session.user.id || ''
        },
        include:{
            category: true,
        },
        orderBy: { createdAt: "desc"},
    })

    return(
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-10 px-6">
                <NewsTable news={news || []}/>
            </div>
        </div>
)
}