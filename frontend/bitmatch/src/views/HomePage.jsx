import ImageSlideshow from "../components/ui/ImageSlideshow";
import ProjectCarousel from "../components/ui/ProjectCarousel";

export default function Home() {
  // Sample data for the slideshow
  const slideshowItems = [
    {
      id: 1,
      title: "Featured New Project Title One",
      description:
        "Description of the project can go here. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      image:
        "https://www.cpp.edu/news/img/news/2025/01/23japanese-garden-view2.jpg?height=400&width=800",
    },
    {
      id: 2,
      title: "Featured New Project Title Two",
      description:
        "Another project description goes here. This is a sample text to demonstrate the slideshow functionality with multiple slides.",
      image:
        "https://cdn2.hubspot.net/hubfs/242200/1MARCOMM/Blog/2018/April/Manufacturing%20AR.jpg?height=400&width=800",
    },
    {
      id: 3,
      title: "Featured New Project Title Three",
      description:
        "Third project description. Each slide can contain different content while maintaining the same layout and design.",
      image:
        "https://www.cpp.edu/engineering/ce/img/seismic-structure-martinez.jpg?height=400&width=800",
    },
    {
      id: 4,
      title: "Featured New Project Title Four",
      description:
        "Fourth project description. The slideshow allows users to navigate through different projects or content items.",
      image:
        "https://raw.githubusercontent.com/cppsea/icebreak/main/assets/banner.png?height=400&width=800",
    },
  ];

  // Sample project data - in a real app this would come from a database
  const projects = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
