"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const CREATE_PROJECT_ENDPOINT = `${SERVER_HOST}/projects/create/`;

export default function CreateProjectForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [projectName, setProjectName] = useState("");
  const [university, setUniversity] = useState("");
  const [group, setGroup] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [sliderImages, setSliderImages] = useState([
    "slideshow_img1.jpg",
    "slideshow_img2.jpg",
    "slideshow_img3.jpg",
    "slideshow_img4.jpg",
    "slideshow_img5.jpg",
  ]);
  const [selectedCategories, setSelectedCategories] = useState([
    "Technology",
    "Health & Fitness",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userUuid, setUserUuid] = useState(null);

  useEffect(() => {
    const fetchUserUuid = async () => {
      try {
        const response = await fetch(`${SERVER_HOST}/userauth/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserUuid(data.id);
      } catch (error) {
        console.error("Error fetching user UUID:", error);
      }
    };

    fetchUserUuid();
  }, [user.id]);

  const handleCoverImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleRemoveCoverImage = () => {
    setCoverImagePreview(null);
    setCoverImageFile(null);
    const fileInput = document.getElementById("cover-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleShortDescriptionChange = (e) => {
    if (e.target.value.length <= 255) {
      setShortDescription(e.target.value);
    }
  };

  const handleFullDescriptionChange = (e) => {
    if (e.target.value.length <= 540) {
      setFullDescription(e.target.value);
    }
  };

  const handleAddRole = () => {
    if (newRole.trim()) {
      setRoles((prevRoles) => [...prevRoles, { title: newRole.trim() }]);
      setNewRole("");
      setRoleError("");
    } else {
      setRoleError("Role can't be empty.");
    }
  };

  const handleRemoveRole = (index) => {
    setRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!projectName.trim()) {
      setError("Project Name is required.");
      setIsLoading(false);
      return;
    }
    if (!university.trim()) {
      setError("University / College Name is required.");
      setIsLoading(false);
      return;
    }
    if (!shortDescription.trim()) {
      setError("Description is required.");
      setIsLoading(false);
      return;
    }
    if (!coverImageFile) {
      setError("Cover Image is required.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", projectName);
    formData.append("institution", university);
    formData.append("group", group);
    formData.append("description", shortDescription);
    formData.append("full_description", fullDescription);
    formData.append("positions", JSON.stringify(roles));
    formData.append("image_url", coverImageFile);
    formData.append("owner", userUuid);

    try {
      const response = await fetch(CREATE_PROJECT_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }

      setSuccessMessage("Project created successfully!");
      if (result.id) {
        // After creating the project, append the project ID to the user's projects
        const updateUserProjectsResponse = await fetch(
          `${SERVER_HOST}/userauth/${user.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              projects: [result.id],
            }),
          }
        );

        if (!updateUserProjectsResponse.ok) {
          throw new Error(
            "Failed to update user projects list. Please try again."
          );
        }

        navigate(`/projects/${result.id}`);
      }
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }

    // TODO: api call to add project to user also.
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate("/project-list")}
          >
            <ChevronRight className="h-4 w-4 mr-2 transform rotate-180" />
            Back to Projects
          </Button>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">
          Add a New Project
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="font-lg mb-1">
              Cover Image <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Minimum: 315x250, Recommended: 630x500
            </p>
            <div className="bg-gray-200 h-64 flex items-center justify-center relative border">
              {coverImagePreview ? (
                <>
                  <img
                    src={coverImagePreview}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveCoverImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full leading-none hover:bg-red-600 transition-colors"
                    aria-label="Remove cover image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <label
                  htmlFor="cover-upload"
                  className="bg-black text-white px-4 py-2 cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  Upload Cover Image
                </label>
              )}
              <input
                id="cover-upload"
                type="file"
                className="hidden"
                onChange={handleCoverImageUpload}
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="university" className="block font-medium mb-1">
              University / College Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="university"
              className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter University Name"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="group" className="block font-medium mb-1">
              Group (Optional)
            </label>
            <input
              type="text"
              id="group"
              className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Group Name (if applicable)"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-1">
              Will this project be associated with a Group? If so, type the
              group name.
            </p>
          </div>

          <div>
            <label htmlFor="short-desc" className="block font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="short-desc"
              className="w-full border rounded-md p-2 resize-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={shortDescription}
              onChange={handleShortDescriptionChange}
              required
              placeholder="Enter a concise description of your project"
              maxLength={255}
            ></textarea>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Max Characters: 255</span>
              <span>Character Count: {shortDescription.length}</span>
            </div>

            <br></br>

            <label htmlFor="full-desc" className="block font-medium mb-1">
              Project Background/More Details (Optional)
            </label>
            <textarea
              id="full-desc"
              className="w-full border rounded-md p-2 resize-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={fullDescription}
              onChange={handleFullDescriptionChange}
              placeholder="Enter your project's background information, or any additional details."
              maxLength={1000}
            ></textarea>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Max Characters: 1000</span>
              <span>Character Count: {fullDescription.length}</span>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Roles/Positions Needed (Optional)
            </label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={newRole}
                onChange={(e) => {
                  setNewRole(e.target.value);
                  setRoleError("");
                }}
                className="flex-grow border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Frontend Developer, UI/UX Designer"
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
              >
                Add Role
              </button>
            </div>

            {roleError && (
              <p className="text-red-500 text-sm mt-1">{roleError}</p>
            )}

            <div className="mt-3 border rounded-md overflow-hidden">
              {roles.length === 0 ? (
                <p className="text-sm text-gray-500 px-4 py-3">
                  No roles added yet.
                </p>
              ) : (
                roles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-2 border-b last:border-b-0 bg-gray-50"
                  >
                    <span className="text-sm">{role.title}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(index)}
                      className="text-red-500 hover:text-red-700 transition-colors font-bold"
                      aria-label={`Remove role: ${role.title}`}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {error && (
            <p className="mb-4 text-red-600 bg-red-100 border border-red-400 p-3 rounded">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="mb-4 text-green-600 bg-green-100 border border-green-400 p-3 rounded">
              {successMessage}
            </p>
          )}
          <div className="mt-8 pt-6 border-t">
            <button
              type="submit"
              className={`bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
