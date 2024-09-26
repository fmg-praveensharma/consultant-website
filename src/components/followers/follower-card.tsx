"use client";

import { ReactNode } from "react";
interface FollowersCardProps {
  name: string;
  id: string;
  photo: string;
  dob: string;
}

export default function FollowersCard({
  name,
  id,
  photo,
  dob,
}: FollowersCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow rounded-lg transition hover:shadow-lg">
      <div className="text-lg font-bold mb-2">{name}</div>
      <img
        src={photo}
        alt={name}
        className="w-16 h-16 rounded-full mb-4 object-cover"
      />
      <div className="text-green-500 mb-2">({id})</div>
      <div className="text-gray-500">{dob}</div>
    </div>
  );
}
