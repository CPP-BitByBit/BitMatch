"use client";

import { Button } from "@/components/ui/button";

export function MemberCard({
  name,
  position,
  joinDate,
  profileImage,
  onAssignPosition,
  onPermissions,
  onRemove,
}) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center">
      <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-sm mr-6">
        {profileImage ? (
          <img
            src={profileImage || "/placeholder.svg"}
            alt={`${name}'s profile`}
            width={80}
            height={80}
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <span className="text-center">
            img
            <br />
            profile
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{name}</h3>
        <p>{position}</p>
        <p>{joinDate}</p>
      </div>
      <div className="space-y-2">
        <Button
          variant="secondary"
          className="w-full bg-gray-300 hover:bg-gray-400 text-black text-sm"
          onClick={onAssignPosition}
        >
          Assign Position
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-gray-300 hover:bg-gray-400 text-black text-sm"
          onClick={onPermissions}
        >
          Permissions
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-gray-300 hover:bg-gray-400 text-black text-sm"
          onClick={onRemove}
        >
          Remove Member
        </Button>
      </div>
    </div>
  );
}