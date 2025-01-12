import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, originalUrl, tags, expirationDate, comment, shortId } = body;

    if (!user || !originalUrl || !tags || !comment) {
      return NextResponse.json(
        { error: "user, originalUrl, tags, and comment are required" },
        { status: 400 }
      );
    }

    if (shortId) {
      const redirectUrl = `${process.env.REDIRECT_URL}/${shortId}`;

      const existingLink = await prisma.link.findFirst({
        where: {
          shortId: shortId,
        },
      });

      if (existingLink) {
        return NextResponse.json(
          { error: "Shortened URL already exists" },
          { status: 400 }
        );
      } else {
        const newLink = await prisma.link.create({
          data: {
            user,
            originalUrl,
            shortId,
            shortenedUrl: redirectUrl,
            tags: tags || [],
            comment: comment || "",
            expirationDate: expirationDate ? new Date(expirationDate) : null,
          },
        });

        return NextResponse.json(newLink, { status: 201 });
      }
    } else {
      let shortId;
      let redirectUrl;
      let existingLink;

      do {
        shortId = nanoid(5);
        redirectUrl = `${process.env.REDIRECT_URL}/${shortId}`;

        existingLink = await prisma.link.findFirst({
          where: {
            shortenedUrl: redirectUrl,
          },
        });
      } while (existingLink);

      const newLink = await prisma.link.create({
        data: {
          user,
          originalUrl,
          shortId,
          shortenedUrl: redirectUrl,
          tags: tags || [],
          comment: comment || "",
          expirationDate: expirationDate ? new Date(expirationDate) : null,
        },
      });

      return NextResponse.json(newLink, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create the link" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");

    if (!user) {
      return NextResponse.json(
        { error: "The 'user' parameter is required" },
        { status: 400 }
      );
    }

    const links = await prisma.link.findMany({
      where: {
        user,
      },
    });

    if (links.length === 0) {
      return NextResponse.json(
        { message: "No links found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve links" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shortId = searchParams.get("shortId");

    if (!shortId) {
      return NextResponse.json(
        { error: "The 'shortId' parameter is required" },
        { status: 400 }
      );
    }

    const link = await prisma.link.findFirst({
      where: {
        shortId: shortId,
      },
    });

    if (!link) {
      return NextResponse.json(
        { error: "Shortened URL not found" },
        { status: 404 }
      );
    }

    await prisma.link.delete({
      where: {
        id: link.id,
      },
    });

    return NextResponse.json(
      { message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete the link" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { user, originalUrl, tags, expirationDate, comment, shortId } = body;

  const link = await prisma.link.findFirst({
    where: {
      shortId: shortId,
    },
  });

  if (!link) {
    return NextResponse.json(
      { error: "Shortened URL not found" },
      { status: 404 }
    );
  } else {
    await prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        user,
        originalUrl,
        tags: tags || link.tags,
        comment: comment || link.comment,
        clicks: link.clicks,
        expirationDate: expirationDate
          ? new Date(expirationDate)
          : link.expirationDate,
      },
    });

    return NextResponse.json({
      message: "Link updated successfully",
      link,
    });
  }
}
