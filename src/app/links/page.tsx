import SideBar from "@/components/SideBar";
import LinksDisplay from "./components/LinksDisplay";

function page() {
  return (
    <main className="flex gap-10 bg-[#F4F4F4] w-screen h-screen p-10 box-border">
      <SideBar />
      <LinksDisplay />
    </main>
  );
}

export default page;
