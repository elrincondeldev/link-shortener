function page() {
  return (
    <main className="bg-[#F4F4F4] h-screen w-screen p-10">
      <section>
        <h1 className="text-black text-2xl font-bold">Brand</h1>
        <div className="flex flex-col items-start gap-3">
          <div className="flex gap-4 items-center">
            <div className="bg-black rounded-full h-12 w-12 "></div>
            <div className="flex flex-col">
              <p className="text-black">El Rincon Del Dev</p>
              <p className="text-[#989898]">Free</p>
            </div>
          </div>
          <button className="text-black bg-gray-300 w-[200px] text-left p-2 rounded-xl font-bold">
            Links
          </button>
          <button className="text-black">Analytics</button>
        </div>
      </section>
    </main>
  );
}

export default page;
