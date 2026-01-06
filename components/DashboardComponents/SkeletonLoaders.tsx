export default function SkeletonLoaders() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-start gap-6.25 flex-wrap grow">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 w-full lg:w-64 bg-gray-200 rounded-primary"
          ></div>
        ))}
      </div>

      <div className="w-full mt-7.5 px-6.25 py-3.75 border border-[#F5F5F5] rounded-primary">
        <div className="h-6 w-full lg:w-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 bg-gray-100 rounded"></div>
      </div>

      <div className="mt-6 border border-[#F5F5F5] px-6.25 py-3.75 rounded-primary">
        <div className="h-6 w-full lg:w-48 bg-gray-200 rounded mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded mb-3"></div>
        ))}
      </div>
    </div>
  );
}
