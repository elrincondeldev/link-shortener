import ReactDOM from "react-dom";
import { useState } from "react";
import { useUserStore } from "@/store/user";

interface CreateLinkProps {
  setPopupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateLink({ setPopupIsOpen }: CreateLinkProps) {
  const { username } = useUserStore();

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [tags, setTags] = useState("");
  const [comment, setComment] = useState("");
  const [expiration, setExpiration] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      user: username,
      originalUrl,
      shortId,
      tags: tags.split(","),
      comment,
      expirationDate: expiration,
    };
    try {
      const response = await fetch("http://localhost:3000/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setPopupIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col gap-4 animate-in bg-white p-6 rounded-xl shadow-lg relative min-w-[500px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/icons/rocketIcon.svg"
              alt="rocket icon"
              className="w-12 h-12 bg-[#F4F4F4] p-2 rounded-full"
            />
            <p className="text-black font-bold text-2xl">New link</p>
          </div>
          <button
            onClick={() => setPopupIsOpen(false)}
            className="font-bold text-black"
          >
            <img src="/icons/closeIcon.svg" alt="close icon" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col ">
            <label htmlFor="originalUrl" className="text-black">
              Destination URL
            </label>
            <input
              onChange={(e) => setOriginalUrl(e.target.value)}
              type="text"
              name="originalUrl"
              placeholder="https://example.com"
              className="rounded-md px-3 py-2 border-2 border-[#D9D9D9] text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="shortenedUrl" className="text-black">
              Shortened URL
            </label>
            <input
              onChange={(e) => setShortId(e.target.value)}
              type="text"
              name="shortenedUrl"
              placeholder="https://example.com"
              className="rounded-md px-3 py-2 border-2 border-[#D9D9D9] text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tags" className="text-black">
              Tags
            </label>
            <input
              onChange={(e) => setTags(e.target.value)}
              type="text"
              name="tags"
              placeholder="tag1, tag2, tag3"
              className="rounded-md px-3 py-2 border-2 border-[#D9D9D9] text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="comment" className="text-black">
              Comment
            </label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              placeholder="Add a comment..."
              className="rounded-md px-3 py-2 border-2 border-[#D9D9D9] text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="expiration" className="text-black">
              Expiration
            </label>
            <input
              onChange={(e) => setExpiration(e.target.value)}
              type="date"
              name="expiration"
              placeholder="Expiration date"
              className="rounded-md px-3 py-2 border-2 border-[#D9D9D9] text-black"
            />
          </div>
          <div className="w-full flex justify-end">
            <button className="bg-black text-white flex items-center gap-2 rounded-md px-3 py-2 font-bold">
              <img src="/icons/cornerDownIcon.svg" alt="corner icon" />
              <p>Create link</p>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default CreateLink;
