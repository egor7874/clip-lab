// src/components/Skeletons/LessonSkeleton.jsx
export default function LessonSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-[#2B2B31] p-6 rounded-2xl animate-pulse">
        <div className="h-7 w-2/3 bg-[#393B43] rounded mb-6"></div>
        <div className="w-full aspect-video bg-[#393B43] rounded-lg mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-[#393B43] rounded"></div>
          <div className="h-4 w-4/5 bg-[#393B43] rounded"></div>
          <div className="h-4 w-2/3 bg-[#393B43] rounded"></div>
          <div className="h-4 w-full bg-[#393B43] rounded"></div>
        </div>
      </div>
    </div>
  );
}