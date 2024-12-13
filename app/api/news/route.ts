import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authOptions, getSession } from "@/lib/auth"
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { title, content, imageUrl, categoryId } = await req.json() 

    console.log(title, content, imageUrl, categoryId, session.user.id)
    const news = await prisma.news.create({
      data: {
        title, 
        content, 
        imageUrl: imageUrl || null,
        categoryId: categoryId || null,
        authorId: session.user.id || '',
        createdAt: new Date (),
        updatedAt: new Date ()
      },
    })


    return NextResponse.json({
      message: 'Berhasil menambahkan berita',
      news: news
    });
  } catch (error) {
    console.error(error);
    
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menambah data' },
      { status: 500 }
    );
  }
}