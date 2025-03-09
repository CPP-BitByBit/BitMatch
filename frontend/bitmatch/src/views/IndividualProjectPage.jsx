import { ChevronRight, ChevronLeft, Plus, Edit, Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "@/components/project/Modal";


const formatNumber = (num) => {
  return num >= 1000000
    ? `${(num / 1000000).toFixed(1)}M`.replace(".0M", "M")
    : num >= 1000
      ? `${(num / 1000).toFixed(1)}K`.replace(".0K", "K")
      : num.toString();
};

// Mock function to simulate fetching project data from an API
const fetchProjectInfo = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const projects = {
    1: {
      group: "Software Engineering Association",
      matchPercentage: 95, // High match since it's directly related to web dev
      title: "Icebreak",
      institution: "Cal Poly Pomona",
      description:
        "A platform for organizations to interact with their members. A central hub for members to be always updated on the latest events while providing features to incentivize member growth.",
      followers: 50,
      likes: 20,
      images: [
        "https://images.unsplash.com/photo-1741276236509-c6f10f4f4c6c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1700346373090-151ac589b07d?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1738996674608-3d2d9d8450a0?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1732736768092-43a010784507?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1738081359154-44d50176b2d0?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1739045193736-8d0f198e292a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      positions: [
        { title: "Frontend Dev" },
        { title: "Backend Dev" },
        { title: "Project Lead" },
        { title: "UI/UX" },
      ],
      imageUrl:
        "https://raw.githubusercontent.com/cppsea/icebreak/main/assets/banner.png",
    },
    2: {
      group: "PolySolve Collaborative",
      matchPercentage: 65,
      title: "Augmented Reality in Art",
      institution: "Cal Poly Pomona",
      description:
        "A project aimed at creating immersive art experiences using augmented reality.",
      followers: 1500,
      likes: 400,
      images: [
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
      ],
      positions: [
        { title: "AR Developer" },
        { title: "Digital Artist" },
        { title: "Art Director" },
      ],
      imageUrl:
        "https://cdn2.hubspot.net/hubfs/242200/1MARCOMM/Blog/2018/April/Manufacturing%20AR.jpg",
    },
    3: {
      group: "Tech Symposium Team",
      matchPercentage: 50,
      title: "Tech Symposium 2024 Setup Volunteer",
      institution: "Cal Poly Pomona",
      description:
        "Volunteer to assist with setting up the Tech Symposium 2024! Help with event logistics, setting up booths, arranging tech equipment, and ensuring the venue is ready for attendees. This is an exciting opportunity to contribute to a student-led conference focused on cybersecurity, system administration, and networking. Get hands-on experience and meet professionals in the field while making a difference in your community.",
      followers: 500,
      likes: 150,
      images: [
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
      ],
      positions: [
        { title: "Setup Coordinator" },
        { title: "Tech Equipment Manager" },
        { title: "Logistics Assistant" },
        { title: "Venue Setup Helper" },
        { title: "Volunteer Team Lead" },
      ],
      imageUrl:
        "https://techsymposium.calpolyswift.org/assets/slides/2024-2.jpg",
    },
    4: {
      group: "College Of Civil Engineering",
      matchPercentage: 40, // Engineering-related but not directly related to web dev
      title: "Engineering Transfer Pathway Improvement",
      institution: "Cal Poly Pomona",
      description:
        "Assist in a research project aimed at creating a standardized Associate Degree for Transfer (ADT) pathway in Engineering to increase success for transfer students in California.",
      followers: 1500,
      likes: 300,
      images: [
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
      ],
      positions: [
        { title: "Research Assistant" },
        { title: "Survey Analyst" },
        { title: "Literature Review Specialist" },
        { title: "Data Analyst" },
        { title: "Project Coordinator" },
      ],
      imageUrl:
        "https://www.cpp.edu/engineering/ce/img/seismic-structure-martinez.jpg",
    },
    5: {
      group: "EcoSaviors Volunteers",
      matchPercentage: 25, // Environmental work is far removed from web dev
      title: "Urban Garden Beautification",
      institution: "Cal Poly Pomona",
      description:
        "EcoSaviors Volunteers is inviting passionate individuals to help revitalize neglected urban spaces by creating beautiful community gardens. Volunteers will assist in planting, designing garden layouts, and maintaining the plants. This project aims to beautify public spaces while promoting sustainability and community engagement. No gardening experience is required, just a love for nature and a willingness to get hands dirty! Join us in creating a greener, cleaner environment for our community.",
      followers: 120,
      likes: 45,
      images: [
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
      ],
      positions: [
        { title: "Garden Planner" },
        { title: "Plant Caretaker" },
        { title: "Event Coordinator" },
      ],
      imageUrl:
        "https://www.cpp.edu/news/img/news/2025/01/23japanese-garden-view2.jpg",
    },
    6: {
      group: "Animal Science Club",
      matchPercentage: 10, // Animal-related work is also far from web dev
      title: "Animal Vaccination Volunteer",
      institution: "Cal Poly Pomona",
      description:
        "The Animal Science Club is seeking dedicated volunteers to assist in the vaccination of animals at upcoming clinics. Volunteers will be working under the supervision of licensed veterinarians to help with the administration of vaccines, prepare supplies, and ensure the animals are safely handled during the process. This is a unique opportunity to gain hands-on experience in animal health and vaccination procedures, while supporting the community's animal welfare initiatives. Previous experience with animals is preferred, but not required.",
      followers: 450,
      likes: 120,
      images: [
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/200/300",
      ],
      positions: [
        { title: "Vaccination Assistant" },
        { title: "Supply Coordinator" },
        { title: "Animal Handler" },
      ],
      imageUrl:
        "https://www.cpp.edu/agri/animal-science/img/programs/goat-vaccination.jpg",
    },
  };

  return projects[id] || null;
};



const ProjectDetailPage = () => {
  const { id } = useParams(); // Access the dynamic `id` parameter from the URL
  const [project, setProject] = useState(null); // State to store project details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview")

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
      setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (project.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
    }
  }

  const selectImage = (index) => {
    setCurrentImageIndex(index)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading project details...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
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
                      src={project.images[currentImageIndex] || "/placeholder.svg"}
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
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
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
                  <span>{project.likes} Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span>{project.followers} Followers</span>
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
                    className={`w-16 h-16 flex-shrink-0 cursor-pointer ${currentImageIndex === index ? "ring-2 ring-blue-500" : ""
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
          <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
            <TabList className="grid grid-cols-6 w-full bg-gray-100 mb-8">
              <Tab value="overview" className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
                selectedClassName="bg-blue-200 text-black">
                Overview
              </Tab>
              <Tab value="updates" className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
              selectedClassName="bg-blue-200 text-black">
                Updates
              </Tab>
              <Tab value="members" className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
              selectedClassName="bg-blue-200 text-black">
                Members
              </Tab>
              <Tab value="wanted" className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
              selectedClassName="bg-blue-200 text-black">
                Wanted
              </Tab>
              <Tab value="discussions" className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
              selectedClassName="bg-blue-200 text-black">
                Discussions
              </Tab>
              <Tab value="contact" className="font-medium px-4 py-2 transition-all hover:bg-blue-100 hover:text-blue-600 rounded-md"
              selectedClassName="bg-blue-200 text-black">
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
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Project
                </Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <h2 className="text-xl font-bold">Edit Project</h2>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p hclassName="text-right">
                      Title
                    </p>
                    <Input
                      id="title"
                      defaultValue={project.title}
                      className="col-span-3"
                    />
                    <p hclassName="text-right">
                      Description
                    </p>
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
