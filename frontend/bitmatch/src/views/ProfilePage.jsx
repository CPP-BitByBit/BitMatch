"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditProfileDialog } from "@/components/project/EditProfileDialog";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import gardenImage from "../assets/j-garden2.jpg";

export default function StudentProfile() {
  const { user } = useUser();
  const { id } = useParams();
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [isOpen, setIsOpen] = useState(false);

  /* if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        );
      }
    
      // Error state
      if (error) {
        return (
          <div className="flex justify-center items-center h-screen">
            <p className="text-red-500">{error}</p>
          </div>
        );
      }
    
      if (!project) {
        return <div className="p-8 text-center">No project found.</div>;
      }
        */

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        {/* Profile Section */}

        <div className="mb-4 border rounded-lg overflow-hidden">
          {/* Background Image */}
          <div
            className="h-48 bg-cover bg-center flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(${gardenImage})`,
            }}
          ></div>

          <div className="px-6 pb-6 relative">
            {/* Profile Image */}
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
                <EditProfileDialog open={isOpen} onOpenChange={setIsOpen} />
              </div>
            )}

            <div className="ml-36">
              <h2 className="text-2xl font-bold"> Name</h2>
              <p className="text-gray-600">Position Title Preference</p>
              <p className="text-gray-600 text-sm mt-1">
                Name of University or College
              </p>
              <p className="text-gray-600 text-sm">Students Major</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-4 border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-sm text-gray-600">
            Summary of the Student. A small description of the student can be
            typed here. It wont be very long. Standard dummy text. A small
            description of the Student can be typed here. It wont be very long.
            Standard dummy text, standard dummy text. Summary of the Student. A
            small description of the student can be typed here. It wont be very
            long. Standard standard dummy text. A small description of the
            Student can be typed here. It wont be very long. Standard dummy
            text, text, standard dummy text. Summary of the Student. A small
            description of the student can be typed here. It wont be very long.
            Standard dummy text, standard dummy text.
          </p>
        </div>

        {/* Current Projects */}
        <div className="mb-8 border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Current Projects</h3>

          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3].map((project) => (
                <div key={project} className="w-1/3 flex-shrink-0">
                  <div className="bg-gray-200 h-32 mb-2 rounded"></div>
                  <p className="text-sm">
                    The Name of the Project will go here. The Name of the
                    Project will go here
                  </p>
                </div>
              ))}
            </div>

            <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Education */}
        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Education</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-gray-500" />
              </div>
              <div>
                <h4 className="font-medium">
                  California State Polytechnic University, Pomona - May 2026
                </h4>
                <p className="text-sm text-gray-600">BA, Computer Science</p>
              </div>
            </div>
          </div>
        </div>

        {/* Positions that Interest Me */}
        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Desired Positions</h3>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Front-End Development
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Full-stack Development
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Backend Development
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Data Engineer
            </Badge>
          </div>
        </div>

        {/* Positions that Interest Me */}
        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Interests</h3>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Front-End Development
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Full-stack Development
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Backend Development
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Data Engineer
            </Badge>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4 border rounded-lg p-6 relative">
          <h3 className="text-xl font-bold mb-4">Skills</h3>

          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Python
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              HTML
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              CSS
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Analytical
            </Badge>
            <Badge variant="outline" className="bg-gray-400 hover:bg-black">
              Communication Skills
            </Badge>
          </div>
        </div>
      </main>
    </div>
  );
}
