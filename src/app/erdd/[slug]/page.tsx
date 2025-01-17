import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function generateMetadata({ params }: any) {
  const slug = params?.slug;

  if (!slug) {
    return {
      title: "404 Not Found",
      description: "The requested link does not exist.",
    };
  }

  const link = await prisma.link.findFirst({
    where: {
      shortId: slug,
    },
  });

  if (!link) {
    return {
      title: "404 Not Found",
      description: "The requested link does not exist.",
    };
  }

  return {
    title: "Redirecting...",
    description: `You are being redirected to ${link.originalUrl}`,
  };
}

export default async function RedirectHandler({ params }: any) {
  const slug = params?.slug;

  if (!slug) {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The requested link does not exist.</p>
      </div>
    );
  }

  const link = await prisma.link.findFirst({
    where: {
      shortId: slug,
    },
  });

  if (!link) {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The requested link does not exist.</p>
      </div>
    );
  }

  await prisma.link.update({
    where: {
      id: link.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
      clickEvents: {
        create: {
          clickedAt: new Date(),
        },
      },
    },
  });

  redirect(link.originalUrl);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
