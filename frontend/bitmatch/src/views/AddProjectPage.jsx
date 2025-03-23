"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function CreateProjectForm() {
  const [coverImage, setCoverImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([
    "slideshow_img1.jpg",
    "slideshow_img2.jpg",
    "slideshow_img3.jpg",
    "slideshow_img4.jpg",
    "slideshow_img5.jpg",
  ]);
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "Technology",
    "Health & Fitness",
  ]);
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [roleError, setRoleError] = useState("");

  const handleCoverImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverImage(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
  };

  const handleShortDescriptionChange = (e) => {
    if (e.target.value.length <= 133) {
      setShortDescription(e.target.value);
    }
  };

  const handleFullDescriptionChange = (e) => {
    if (e.target.value.length <= 540) {
      setFullDescription(e.target.value);
    }
  };

  // Add role to the roles array
  const handleAddRole = () => {
    if (newRole.trim()) {
      setRoles((prevRoles) => [...prevRoles, newRole.trim()]);
      setNewRole("");
      setRoleError("");
    } else {
      setRoleError("Role can't be empty.");
    }
  };

  // Remove a role from the roles array
  const handleRemoveRole = (index) => {
    setRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ChevronRight className="h-4 w-4 mr-2 transform rotate-180" />
            Back to Projects
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">
          Add a New Project
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Cover Image Section */}
          <div>
            <h2 className="font-lg mb-1">
              Cover Image <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Minimum: 315x250, Recommended: 630x500
            </p>
            <div className="bg-gray-200 h-64 flex items-center justify-center relative">
              {coverImage ? (
                <>
                  <img
                    src={coverImage || "/placeholder.svg"}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveCoverImage}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <label
                  htmlFor="cover-upload"
                  className="bg-black text-white px-4 py-2 cursor-pointer"
                >
                  Upload cover Image
                </label>
              )}
              <input
                id="cover-upload"
                type="file"
                className="hidden"
                onChange={handleCoverImageUpload}
                accept="image/*"
                required
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full border rounded-md p-2"
              placeholder="Enter Project Name"
            />
          </div>

          {/* University/College */}
          <div>
            <label htmlFor="university" className="block font-medium mb-2">
              University / College Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="university"
              className="w-full border rounded-md p-2"
              placeholder="Enter University Name"
              required
            />
          </div>

          {/* Group Assignment */}
          <div>
            <label htmlFor="group" className="block font-medium mb-2">
              Group
            </label>
            <input
              type="text"
              id="group"
              className="w-full border rounded-md p-2"
              placeholder="Enter Group Name"
            />
            <p className="text-sm text-gray-600 mt-1">
              Will this project be associated with a Group? If so, type the
              group name to assign this project to it.
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="short-desc" className="block font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="short-desc"
              className="w-full border rounded-md p-2 resize-none"
              rows={3}
              value={shortDescription}
              onChange={handleShortDescriptionChange}
              required
              placeholder="Enter Description"
            ></textarea>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Max Characters: 255</span>
              <span>Character Count: {shortDescription.length}</span>
            </div>
          </div>

          {/* Roles Section */}
          <div>
            <div className="flex items-center space-x-4">
              <label className="font-lg mb-1">Roles/Positions Needed:</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-50 h-6.5 border rounded-md p-2"
                placeholder="Enter Role/Position"
              />
              <button
                onClick={handleAddRole}
                className="bg-black text-white px-2 py-0.5 rounded-md"
              >
                +
              </button>
            </div>

            {roleError && (
              <p className="text-red-500 text-sm mt-2">{roleError}</p>
            )}

            <div className="mt-4">
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 border-b"
                >
                  <span>{role}</span>
                  <button
                    onClick={() => handleRemoveRole(index)}
                    className="text-red-500 text-xl"
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-black text-white px-8 py-2 mt-6">Create</button>
        </div>
      </main>
    </div>
  );
}
