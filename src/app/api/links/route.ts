import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, originalUrl, shortenedUrl, tags, expirationDate } = body;

    if (!user || !originalUrl || !shortenedUrl) {
      return NextResponse.json(
        { error: "user, originalUrl, and shortenedUrl are required" },
        { status: 400 }
      );
    }

    // Crear un nuevo enlace en la base de datos
    const newLink = await prisma.link.create({
      data: {
        user,
        originalUrl,
        shortenedUrl,
        tags: tags || [], // Asegurar que sea un arreglo vacío si no se envían tags
        expirationDate: expirationDate ? new Date(expirationDate) : null, // Convertir si es necesario
      },
    });

    // Responder con el enlace creado
    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create the link" },
      { status: 500 }
    );
  }
}
