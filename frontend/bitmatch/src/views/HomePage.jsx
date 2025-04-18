import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlideshow from "../components/ui/ImageSlideshow";
import ProjectCarousel from "../components/ui/ProjectCarousel";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { calculateMatchScores } from "./MatchScoreUtils";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export default function Home() {
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

  const slideshowItems = projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image_url,
  }));

  // Fetch project data on component mount
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
        console.log(sortedProjects);
      } catch (error) {
        console.error("Error fetching user and projects:", error);
        setError("Couldn't load projects or user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProjects();
  }, [user.id]);

  // Loading state
  if (loading) {
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

  return (
    <main className="home-container">
      <ImageSlideshow items={slideshowItems} />

      <div className="mt-12 mb-8">
        <h2 className="text-3xl font-bold mb-6">Popular Student Projects</h2>
        <hr className="border-t-2 border-gray-200 my-2 mb-8" />
        <ProjectCarousel projects={projects} />
      </div>

      <div className="flex justify-center mt-8 mb-12">
        <a href="/project-list/">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-8 rounded">
            Explore More
          </button>
        </a>
      </div>
    </main>
  );
}
