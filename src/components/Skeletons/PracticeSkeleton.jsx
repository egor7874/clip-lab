import React from "react";
import practiceIcon from "../../assets/image49.png";

export default function PracticeSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse">
      <div className="bg-[#2B2B31] p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-8 w-40 bg-gray-700 rounded mb-4" />
            <div className="h-6 w-72 bg-gray-700 rounded" />
          </div>
          <img
            src={practiceIcon}
            alt="Практика"
            className="w-64 aspect-square object-contain ml-4 opacity-30"
            draggable={false}
          />
        </div>

        <div className="bg-[#38383F] p-6 rounded-2xl text-white mb-6">
          <div className="space-y-3">
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-3/5 bg-gray-700 rounded" />
          </div>
        </div>

        <div className="bg-[#38383F] p-6 rounded-2xl text-white mt-6 flex flex-row items-stretch gap-8 min-h-[220px] h-full">
          <div className="min-w-[270px] space-y-3 h-full">
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="h-4 w-4/5 bg-gray-700 rounded" />
          </div>
          <div className="flex-1 min-w-[250px] flex flex-col justify-end gap-2 h-full">
            <div className="h-8 w-48 bg-gray-700 rounded mb-2" />
            <div className="h-10 w-full bg-gray-700 rounded mb-2" />
            <div className="h-8 w-28 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}