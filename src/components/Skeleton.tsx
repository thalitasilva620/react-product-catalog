export const Skeleton = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-xl shadow-md">
      <div className="h-40 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};