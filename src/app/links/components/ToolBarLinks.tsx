"use client";

import CreateLink from "./CreateLink";
import { useState } from "react";

function ToolBarLinks() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <button className="flex items-center gap-4 rounded-md px-3 py-2 border-2 border-[#D9D9D9] text-black">
        <div className="flex items-center gap-2">
          <img
            src="/icons/settingsIcon.svg"
            alt="settings icon"
            className="w-6 h-6"
          />
          <p>Display</p>
        </div>
        <img
          src="/icons/arrowDown.svg"
          alt="arrow down icon"
          className="w-8 h-8"
        />
      </button>
      <div className="flex items-center gap-5">
        <input
          className="rounded-md px-3 py-2 border-2 border-[#D9D9D9] text-black w-[300px]"
          type="text"
          name="search"
          placeholder="Search..."
        />
        <button
          onClick={() => setPopupIsOpen(true)}
          className="flex items-center gap-2 bg-black rounded-md px-3 py-2 text-white"
        >
          <p className="font-bold">Create link</p>
          <p className="bg-[#4B5563] text-[#b4b8bc] p-1 rounded-md w-7 h-7 flex justify-center items-center">
            C
          </p>
        </button>
      </div>
      {popupIsOpen && <CreateLink setPopupIsOpen={setPopupIsOpen} />}
    </div>
  );
}

export default ToolBarLinks;
