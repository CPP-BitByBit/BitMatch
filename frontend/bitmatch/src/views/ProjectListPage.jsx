import { ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCardLarge from "@/components/project/ProjectCardLarge"

export default function ProjectListPage() {
  // Sample project data - in a real app this would come from a database
  const projects = Array(6).fill({
    group: "Google Developers Group",
    matchPercentage: 20,
    title: "Edit this title. Name of the Project will go here and can be pretty long",
    institution: "University name or College name",
    description:
      "Edit this. This is the tagline. It's a small description of the project can be typed here. It won't be very long. Standard dummy text.",
    followers: 2000000,
    likes: 2000000,
    positions: [
      { title: "Programmers", count: 1 },
      { title: "Artists", count: 1 },
      { title: "Marketers", count: 1 },
    ],
  })

  return (
    <main className="container mx-auto px-4 py-8 pt-40 pb-40">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold sans-display">My Project List</h1>
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
          <ProjectCardLarge key={index} project={project} highlighted={index === 2} />
        ))}
      </div>
    </main>
  )
}
