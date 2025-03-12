import { useEffect, useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCardLarge from "@/components/project/ProjectCardLarge";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
import axios from "axios";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`${SERVER_HOST}/projects/`)
      .then((response) => {
        const sortedProjects = response.data.sort(
          (a, b) => b.match_percentage - a.match_percentage
        );
        setProjects(sortedProjects);
        setLoading(false);
      })
      .catch((error) => {
        setError("Couldn't load projects.");
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>{" "}
        {/* Simple loading spinner */}
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

  return (
    <main className="pt-20 pb-20">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold sans-display flex-grow">
          Public Projects List
        </h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Project
        </Button>
      </div>
      <hr className="border-t-2 border-gray-200 my-2" />

      {/* "More" Button */}
      <div className="flex justify-end mb-4">
        <Button variant="ghost" className="flex items-center gap-2">
          More
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCardLarge
            key={index}
            project={project}
            highlighted={index === 2}
          />
        ))}
      </div>
    </main>
  );
}
