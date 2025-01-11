import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="absolute w-screen h-screen overflow-hidden">
      <div className="absolute top-0 bottom-0 left-40 flex items-center justify-center z-10 pointer-events-auto">
        <SignIn />
      </div>
      <div className="bg-[#dddddd] w-[700px] h-[700px] rounded-2xl shadow-xl z-20 absolute top-1/2 right-[-150px] -translate-y-1/2 pointer-events-none"></div>

      <div className="relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
    </main>
  );
}
