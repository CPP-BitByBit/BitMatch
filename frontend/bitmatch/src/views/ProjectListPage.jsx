import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCardLarge from "@/components/project/ProjectCardLarge";

export default function ProjectListPage() {
  // Sample project data - in a real app this would come from a database
  const projects = [
    {
      group: "Software Engineering Association",
      matchPercentage: 95, // High match since it's directly related to web dev
      title: "Icebreak",
      institution: "Cal Poly Pomona",
      description:
        "A platform for organizations to interact with their members. A central hub for members to be always updated on the latest events while providing features to incentivize member growth.",
      followers: 50,
      likes: 20,
      positions: [
        { title: "Frontend Dev" },
        { title: "Backend Dev" },
        { title: "Project Lead" },
        { title: "UI/UX" },
      ],
      imageUrl:
        "https://raw.githubusercontent.com/cppsea/icebreak/main/assets/banner.png",
    },
    {
      group: "PolySolve Collaborative",
      matchPercentage: 65,
      title: "Augmented Reality in Art",
      institution: "Cal Poly Pomona",
      description:
        "A project aimed at creating immersive art experiences using augmented reality.",
      followers: 1500,
      likes: 400,
      positions: [
        { title: "AR Developer" },
        { title: "Digital Artist" },
        { title: "Art Director" },
      ],
      imageUrl:
        "https://cdn2.hubspot.net/hubfs/242200/1MARCOMM/Blog/2018/April/Manufacturing%20AR.jpg",
    },
    {
      group: "Tech Symposium Team",
      matchPercentage: 50,
      title: "Tech Symposium 2024 Setup Volunteer",
      institution: "Cal Poly Pomona",
      description:
        "Volunteer to assist with setting up the Tech Symposium 2024! Help with event logistics, setting up booths, arranging tech equipment, and ensuring the venue is ready for attendees. This is an exciting opportunity to contribute to a student-led conference focused on cybersecurity, system administration, and networking. Get hands-on experience and meet professionals in the field while making a difference in your community.",
      followers: 500,
      likes: 150,
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
    {
      group: "College Of Civil Engineering",
      matchPercentage: 40, // Engineering-related but not directly related to web dev
      title: "Engineering Transfer Pathway Improvement",
      institution: "Cal Poly Pomona",
      description:
        "Assist in a research project aimed at creating a standardized Associate Degree for Transfer (ADT) pathway in Engineering to increase success for transfer students in California.",
      followers: 1500,
      likes: 300,
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
    {
      group: "EcoSaviors Volunteers",
      matchPercentage: 25, // Environmental work is far removed from web dev
      title: "Urban Garden Beautification",
      institution: "Cal Poly Pomona",
      description:
        "EcoSaviors Volunteers is inviting passionate individuals to help revitalize neglected urban spaces by creating beautiful community gardens. Volunteers will assist in planting, designing garden layouts, and maintaining the plants. This project aims to beautify public spaces while promoting sustainability and community engagement. No gardening experience is required, just a love for nature and a willingness to get hands dirty! Join us in creating a greener, cleaner environment for our community.",
      followers: 120,
      likes: 45,
      positions: [
        { title: "Garden Planner" },
        { title: "Plant Caretaker" },
        { title: "Event Coordinator" },
      ],
      imageUrl:
        "https://www.cpp.edu/news/img/news/2025/01/23japanese-garden-view2.jpg",
    },
    {
      group: "Animal Science Club",
      matchPercentage: 10, // Animal-related work is also far from web dev
      title: "Animal Vaccination Volunteer",
      institution: "Cal Poly Pomona",
      description:
        "The Animal Science Club is seeking dedicated volunteers to assist in the vaccination of animals at upcoming clinics. Volunteers will be working under the supervision of licensed veterinarians to help with the administration of vaccines, prepare supplies, and ensure the animals are safely handled during the process. This is a unique opportunity to gain hands-on experience in animal health and vaccination procedures, while supporting the community's animal welfare initiatives. Previous experience with animals is preferred, but not required.",
      followers: 450,
      likes: 120,
      positions: [
        { title: "Vaccination Assistant" },
        { title: "Supply Coordinator" },
        { title: "Animal Handler" },
      ],
      imageUrl:
        "https://www.cpp.edu/agri/animal-science/img/programs/goat-vaccination.jpg",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 pt-40 pb-40">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold sans-display">Public Projects List</h1>
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
