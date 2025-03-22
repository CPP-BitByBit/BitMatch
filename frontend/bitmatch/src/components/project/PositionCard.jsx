"use client";

import { Button } from "@/components/ui/button";

export function PositionCard({
  id,
  title,
  datePosted,
  description,
  responsibilities,
  skillSets,
  qualification,
  skillMatch,
  onEdit,
  onDelete,
  onApply,
}) {
  return (
    <div className="border-t py-6">
      <div className="flex items-center mb-4">
        <div className="bg-white border rounded-lg px-4 py-2 mr-4">
          <span className="font-semibold">Position{id}</span>
        </div>
        <h3 className="text-xl font-bold">Title: {title}</h3>
      </div>

      <p className="text-sm mb-6">{datePosted}</p>

      <div className="mb-6">
        <h4 className="font-bold mb-2">About this Position</h4>
        <p>{description}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-bold mb-2">Role Responsibilities</h4>
        <ul className="list-disc pl-6 space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="font-bold mb-2">Skill Sets Needed for this Position</h4>
        <div className="grid grid-cols-3 gap-4">
          <ul className="list-disc pl-6">
            {skillSets.technical.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <ul className="list-disc pl-6">
            {skillSets.tools.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>
          <ul className="list-disc pl-6">
            {skillSets.soft.map((soft, index) => (
              <li key={index}>{soft}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mb-6 font-medium">
        Must be a part of {qualification} to qualify for this position
      </p>

      <div className="flex justify-between items-center">
        <div>
          <Button
            className="bg-gray-200 hover:bg-gray-300 text-black mr-2"
            onClick={() => onApply && onApply(id)}
          >
            Apply For this Position
          </Button>
        </div>

        <div className="flex items-center">
          <div className="flex space-x-2 mr-6">
            <Button
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 text-black"
              onClick={() => onEdit && onEdit(id)}
            >
              Edit Position
            </Button>
            <Button
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 text-black"
              onClick={() => onDelete && onDelete(id)}
            >
              Delete Position
            </Button>
          </div>

          {skillMatch !== undefined && (
            <div className="text-right">
              <span className="font-bold">{skillMatch}% Skill Match</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

PositionCard.defaultProps = {
    responsibilities: [],
    skillSets: {
      technical: [],
      tools: [],
      soft: [],
    },
    qualification: "Not specified",
    skillMatch: undefined,
    onEdit: undefined,
    onDelete: undefined,
    onApply: undefined,
  };