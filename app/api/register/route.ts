import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request){
    try { 
        const { name, email, password } = await req.json()

        if (!name || !email || !password){
            return NextResponse.json(
                { error: 'Semua field harus diisi!'},
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser){
            return NextResponse.json(
                { error: 'Email sudah terdaftar.' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json({
            message: 'Registrasi berhasil.',
            userId: user.id,
            email: user.email,
            name: user.name
        });
    } catch (error) {
        console.error('Registration error.', error);

        return NextResponse.json(
            { error: 'Terjadi kesalahan saat registrasi.' },
            { status: 500 }
        )
        
    }
}

