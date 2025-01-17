"use client";

import ToolBarLinks from "./ToolBarLinks";
import LinkComponent from "./LinkComponent";
import { useEffect, useState } from "react";
import LinkSkeletonLoader from "./LinkSkeletonLoader";
import { useUser } from "@clerk/nextjs";

interface LinkInterface {
  active: boolean;
  clicks: number;
  createdAt: Date;
  expirationDate: Date | null;
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  tags: string[];
}

function LinksDisplay() {
  const { user } = useUser();

  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/links?user=${user?.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();

        setLinks(data);

        console.log(data);
      }
    };

    fetchData();
  }, [user]);

  return (
    <section className="flex flex-col gap-10 text-black bg-white w-full rounded-xl p-10 shadow-sm">
      <h2 className="text-3xl font-bold">Links</h2>
      <ToolBarLinks />
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <LinkSkeletonLoader />
        ) : (
          links.map((link: LinkInterface) => (
            <LinkComponent
              key={link.id}
              shortUrl={link.shortenedUrl}
              originalUrl={link.originalUrl}
              clicks={link.clicks}
              createdAt={link.createdAt}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default LinksDisplay;
