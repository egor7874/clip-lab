import React from "react";

export default function TaskSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse">
      <div className="bg-[#2B2B31] p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-8 w-48 bg-gray-700 rounded mb-4" />
            <div className="h-6 w-64 bg-gray-700 rounded" />
          </div>
          <div className="w-64 h-64 bg-gray-700 rounded-xl ml-4" />
        </div>
        <div className="bg-[#38383F] p-6 rounded-2xl text-white mb-6">
          <div className="space-y-3">
            <div className="h-5 w-full bg-gray-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="h-4 w-1/3 bg-gray-700 rounded" />
          </div>
        </div>
        <div className="bg-[#38383F] p-6 rounded-2xl text-white mt-6 flex flex-row items-stretch gap-8 min-h-[220px] h-full">
          <div className="space-y-3 min-w-[270px] w-[270px]">
            <div className="h-5 w-3/4 bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="h-4 w-1/4 bg-gray-700 rounded" />
          </div>
          <div className="flex-1 flex flex-col justify-end gap-4">
            <div className="h-10 w-3/4 bg-gray-700 rounded-xl mx-auto" />
            <div className="h-8 w-full bg-gray-700 rounded" />
            <div className="h-8 w-full bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}