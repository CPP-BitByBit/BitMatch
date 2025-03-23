import { ChevronRight, ChevronLeft, Plus, Edit, Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "@/components/project/Modal";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
import axios from "axios";

const formatNumber = (num) => {
  return num >= 1000000
    ? `${(num / 1000000).toFixed(1)}M`.replace(".0M", "M")
    : num >= 1000
    ? `${(num / 1000).toFixed(1)}K`.replace(".0K", "K")
    : num.toString();
};

const fetchProjectInfo = async (id) => {
  try {
    const response = await fetch(`${SERVER_HOST}/projects/${id}/`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const projectData = await response.json();
    console.log(projectData);

    return projectData;
  } catch (error) {
    console.error("Error fetching project info:", error);
    return null;
  }
};

const ProjectDetailPage = () => {
  const { id } = useParams(); // Access the dynamic `id` parameter from the URL
  const [project, setProject] = useState(null); // State to store project details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch project details when the component mounts or the `id` changes
    const loadProjectInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchProjectInfo(id);
        if (data) {
          setProject(data);
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    loadProjectInfo();
  }, [id]);

  const nextImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

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

  if (!project) {
    return <div className="p-8 text-center">No project found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Project Details Card */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar placeholder */}
        <header className="border-b p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.history.back()}
            >
              <ChevronRight className="h-4 w-4 mr-2 transform rotate-180" />
              Back
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-4xl font-bold mb-8">{project.title}</h1>

          {/* Project showcase */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Image Slider */}
            <div className="relative bg-gray-200 aspect-[4/3] flex items-center justify-center">
              {project.images && project.images.length > 0 ? (
                <>
                  <div className="relative w-full h-full">
                    <img
                      src={
                        project.images[currentImageIndex] || "/placeholder.svg"
                      }
                      alt="Project image"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    <p className="text-center text-sm text-gray-600 bg-white/80 px-2 py-1 rounded">
                      Slider
                      <br />
                      Image snapshots are below
                    </p>
                  </div>
                </>
              ) : (
                <span>No images available</span>
              )}
            </div>
            {/* Project info */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={`${project.title} Cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>Cover Image goes here</span>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold">{project.group}</h2>
                <p className="text-sm">{project.description}</p>
              </div>

              <div className="flex gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>{project.likes_count} Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>{project.followers_count} Followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="relative mb-8">
            <div className="flex overflow-x-auto space-x-2 py-2">
              {project.images &&
                project.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 flex-shrink-0 cursor-pointer ${
                      currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Pic ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="overview"
            className="mb-8"
            onValueChange={setActiveTab}
          >
            <TabList className="grid grid-cols-6 w-full bg-gray-100 mb-8">
              <Tab
                value="overview"
                className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Overview
              </Tab>
              <Tab
                value="updates"
                className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Updates
              </Tab>
              <Tab
                value="members"
                className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Members
              </Tab>
              <Tab
                value="wanted"
                className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Wanted
              </Tab>
              <Tab
                value="discussions"
                className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Discussions
              </Tab>
              <Tab
                value="contact"
                className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black"
              >
                Contact
              </Tab>
            </TabList>

            <TabPanel value="overview" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Overview</h3>
              </div>
              <h4 className="text-xl font-semibold mb-4">
                Background & More Details About the Project
              </h4>
              <div className="mb-6">
                <h5 className="font-semibold mb-2">
                  This space will be filled in by the owner
                </h5>
                <p className="text-sm">{project.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Project
                </Button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <h2 className="text-xl font-bold">Edit Project</h2>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p hclassName="text-right">Title</p>
                    <Input
                      id="title"
                      defaultValue={project.title}
                      className="col-span-3"
                    />
                    <p hclassName="text-right">Description</p>
                    <Input
                      id="description"
                      defaultValue={project.description}
                      className="col-span-3"
                    />
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </Modal>
              </div>
            </TabPanel>

            <TabPanel value="updates">
              <div className="p-4 text-center">
                <p className="text-muted-foreground">
                  Updates content will go here
                </p>
              </div>
            </TabPanel>

            <TabPanel value="members">
              <div className="p-4 text-center">
                <p className="text-muted-foreground">
                  Members content will go here
                </p>
              </div>
            </TabPanel>

            <TabPanel value="wanted">
              <div className="p-4 text-center">
                <p className="text-muted-foreground">
                  Wanted content will go here
                </p>
              </div>
            </TabPanel>

            <TabPanel value="discussions">
              <div className="p-4 text-center">
                <p className="text-muted-foreground">
                  Discussions content will go here
                </p>
              </div>
            </TabPanel>

            <TabPanel value="contact">
              <div className="p-4 text-center">
                <p className="text-muted-foreground">
                  Contact content will go here
                </p>
              </div>
            </TabPanel>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t p-4 text-center">
          <p className="text-muted-foreground">Footer</p>
        </footer>
      </div>

      {/* Action Buttons */}
    </div>
  );
};

export default ProjectDetailPage;
