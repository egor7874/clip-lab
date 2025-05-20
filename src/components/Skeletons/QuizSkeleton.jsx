// src/components/Skeletons/QuizSkeleton.jsx
export default function QuizSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse">
      <div className="bg-[#2B2B31] p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-9 w-40 bg-gray-700 rounded mb-4"></div>
            <div className="h-7 w-64 bg-gray-700 rounded mb-2"></div>
          </div>
          <div className="w-52 h-52 bg-gray-800 rounded-xl"></div>
        </div>
        <div className="bg-[#38383F] p-6 rounded-xl mt-6">
          <div className="h-2 w-full bg-gray-700 rounded mb-4"></div>
          <div className="h-6 w-28 bg-gray-700 rounded mb-3"></div>
          <div className="h-4 w-3/4 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-700 rounded"></div>
            <div className="h-5 w-5/6 bg-gray-700 rounded"></div>
            <div className="h-5 w-2/3 bg-gray-700 rounded"></div>
            <div className="h-5 w-4/5 bg-gray-700 rounded"></div>
          </div>
          <div className="h-10 w-40 bg-gray-800 rounded-full mt-8 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}