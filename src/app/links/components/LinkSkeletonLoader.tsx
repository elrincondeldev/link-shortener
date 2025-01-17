function LinkSkeletonLoader() {
  return (
    <div className="flex justify-between items-center border-2 border-[#D9D9D9] rounded-xl px-5 py-2 animate-pulse">
      <div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-5 w-5 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-4 w-32 bg-gray-300 rounded-md mt-2"></div>
        <div className="h-3 w-24 bg-gray-300 rounded-md mt-1"></div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 bg-[#F3F4F6] border-2 border-[#E5E7EB] px-3 py-1 rounded-md">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}

export default LinkSkeletonLoader;
