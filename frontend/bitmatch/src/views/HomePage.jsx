import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlideshow from "../components/ui/ImageSlideshow";
import ProjectCarousel from "../components/ui/ProjectCarousel";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export default function Home() {
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
    axios
      .get(`${SERVER_HOST}/projects/`)
      .then((response) => {
        setProjects(response.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects."); // Set error if fetch fails
        setLoading(false);
      });
  }, []);

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
    <main className="min-h-screen bg-white">
      <ImageSlideshow items={slideshowItems} />

      <div className="mt-12 mb-8">
        <h2 className="text-3xl font-bold mb-6">Popular Student Projects</h2>
        <hr className="border-t-2 border-gray-200 my-2 mb-8" />
        <ProjectCarousel projects={projects} />
      </div>

      <div className="flex justify-center mt-8 mb-12">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-8 rounded">
          <a href="/project-list/">Explore More</a>
        </button>
      </div>
    </main>
  );
}
