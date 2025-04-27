import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCardLarge from "@/components/project/ProjectCardLarge";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { calculateMatchScores } from "./MatchScoreUtils";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const checkIfUserOnboarded = async (userId) => {
    try {
      const response = await fetch(
        `${SERVER_HOST}/userauth/onboard/check/${userId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to check onboarding status");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      return null;
    }
  };

  useEffect(() => {
    const runCheck = async () => {
      if (!user) return;
      const onboarded = await checkIfUserOnboarded(user.id);

      if (onboarded.message === "User not onboarded yet!") {
        navigate("/onboard");
      }
    };

    runCheck();
  }, [user, navigate]);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`${SERVER_HOST}/userauth/${user.id}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();

        // Fetch project data
        const projectsResponse = await axios.get(`${SERVER_HOST}/projects/`);
        const projects = projectsResponse.data;

        // Pass both userData and projects to a function for match score calculation
        const projectsWithScores = calculateMatchScores(userData, projects);

        // Sort projects based on match score
        const sortedProjects = projectsWithScores.sort(
          (a, b) => b.match_percentage - a.match_percentage
        );

        // Update state with sorted projects
        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching user and projects:", error);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProjects();
  }, [user.id]);

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
        <a href="/create-project/">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Project
          </Button>
        </a>
      </div>
      <hr className="border-t-2 border-gray-200 my-2" />

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
