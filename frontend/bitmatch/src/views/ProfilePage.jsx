"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditProfileDialog } from "@/components/project/EditProfileDialog";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import gardenImage from "../assets/j-garden2.jpg";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export default function StudentProfile() {
  const { user } = useUser();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [userUuid, setUserUuid] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${SERVER_HOST}/userauth/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfile(data);
        setUserUuid(data.id);
        fetchProjectDetails(data.projects);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjectDetails = async (projectIds) => {
      const projects = await Promise.all(
        projectIds.map(async (projectId) => {
          try {
            const response = await fetch(
              `${SERVER_HOST}/projects/${projectId}/`
            );
            const project = await response.json();
            return project;
          } catch (error) {
            console.error("Error fetching project:", error);
            return null;
          }
        })
      );
      setProjectsData(projects.filter((project) => project !== null));
      console.log(projectsData);
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="mb-4 border rounded-lg overflow-hidden">
          <div
            className="h-48 bg-cover bg-center flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(${gardenImage})`,
            }}
          ></div>

          <div className="px-6 pb-6 relative">
            <div className="w-32 h-32 bg-gray-100 rounded-full absolute -top-16 flex items-center justify-center border-4 border-white overflow-hidden">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {user?.id === id && (
              <div className="flex justify-end pt-4 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={(e) => {
                    setIsOpen(true);
                    e.preventDefault();
                  }}
                >
                  Edit Profile
                </Button>
                <EditProfileDialog
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  profile={profile}
                />
              </div>
            )}
            <div className="ml-36">
              <h2 className="text-2xl font-bold">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Student @ {profile.college}
              </p>
              <p className="text-gray-600 text-sm">{profile.location}</p>

              <p className="text-gray-600 text-sm mt-2">
                Email:{" "}
                <a href={`mailto:${profile.email}`} className="text-blue-600">
                  {profile.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-sm text-gray-600">{profile.about_me}</p>
        </div>

        <div className="mb-8 border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Projects</h3>

          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {projectsData
                .slice(currentIndex, currentIndex + 3)
                .map((project, index) => (
                  <Link
                    key={index}
                    to={`/projects/${project.id}`}
                    className="w-1/3 flex-shrink-0"
                  >
                    <div className="bg-gray-200 h-32 mb-2 rounded">
                      {project.image_url && (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                    <p className="text-lg ml-5 font-bold text-gray-800">
                      {project.title}
                      <span className="ml-2 text-sm font-medium-bold text-blue-600">
                        {project.owner === userUuid ? "– Owner" : "– Member"}
                      </span>
                    </p>
                  </Link>
                ))}
            </div>

            <button
              onClick={handleLeftArrowClick}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleRightArrowClick}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Education</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-gray-500" />
              </div>
              <div>
                <h4 className="font-medium">
                  {profile.college} - {profile.grad_date}
                </h4>
                <p className="text-sm text-gray-600">BA, Computer Science</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Desired Positions</h3>

          <div className="flex flex-wrap gap-2">
            {profile.roles.map((role, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-gray-400 hover:bg-black"
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Interests</h3>

          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-gray-400 hover:bg-black"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Skills</h3>

          <div className="flex flex-wrap gap-2 mb-2">
            {profile.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-gray-400 hover:bg-black"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
