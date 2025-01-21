import toast from "react-hot-toast";

interface LinkComponentProps {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

function LinkComponent({
  shortUrl,
  originalUrl,
  clicks,
  createdAt,
}: LinkComponentProps) {
  const onHandleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <div className="flex justify-between items-center border-2 border-[]#D9D9D9] rounded-xl px-5 py-2">
      <div>
        <div className="flex items-center gap-1">
          <p className="font-bold text-md">{shortUrl}</p>
          <button onClick={onHandleCopy}>
            <img
              className="w-5 h-5"
              src="/icons/copyIcon.svg"
              alt="copy icon"
            />
          </button>
        </div>
        <p className="underline text-[#989898]">{originalUrl}</p>
        <p className="text-[#CAC7C7]">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 bg-[#F3F4F6] border-2 border-[#E5E7EB] px-3 py-1 rounded-md">
          <img
            src="/icons/mouseIcon.svg"
            alt="mouse icon"
            className="w-5 h-5"
          />
          <p>{clicks} clicks</p>
        </div>
        <button>
          <img
            src="/icons/settingsLinkIcon.svg"
            alt="settings icon"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
}

export default LinkComponent;
