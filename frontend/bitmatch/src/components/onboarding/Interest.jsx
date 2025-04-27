"use client";

import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const Interest = forwardRef(({ onDataChange, formData }, ref) => {
  const [interests, setInterests] = useState(formData?.interests || []);
  const [newInterest, setNewInterest] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    onDataChange({ interests });
  }, [interests]);

  const validate = () => {
    if (interests.length === 0) {
      setError("Please add at least one interest.");
      return false;
    }
    setError("");
    return true;
  };

  useImperativeHandle(ref, () => ({ validate }));

  const handleAdd = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed].sort());
      setNewInterest("");
      setError("");
    }
  };

  const handleRemove = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">
        What categories/topics/hobbies are you most interested in?{" "}
        <span className="text-red-500">*</span>
      </label>

      <div className="flex space-x-2">
        <Input
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Type a category"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          Add
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-2">
        {interests.map((interest) => (
          <div
            key={interest}
            className="flex justify-between items-center bg-blue-600 text-white px-3 py-2 rounded-md"
          >
            <span>{interest}</span>
            <button onClick={() => handleRemove(interest)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Interest;
