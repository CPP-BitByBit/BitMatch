"use client";

import { Link } from "react-router-dom";

export function MemberCard({ name, position, joinDate, profileImage, authId }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center">
      <div className="w-20 h-20 mr-6">
        <img
          src={profileImage || "/placeholder.svg"}
          alt={`${name}'s profile`}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        {authId ? (
          <Link
            to={`/profile/${authId}`}
            className="text-blue-500 hover:underline font-bold text-lg"
          >
            {name}
          </Link>
        ) : (
          <h3 className="font-bold text-lg">{name}</h3>
        )}
        <p>{position || "Contributor"}</p>
      </div>
    </div>
  );
}
