import ProjectCardLarge from "@/components/project/ProjectCardLarge";

const ProjectListPage = () => {
  // Example array of project objects
  const projects = [
    {
      title: "Project 1",
      group: "Group A",
      institution: "University A",
      description: "Project description here",
      followers: 1200,
      likes: 300,
      positions: ["Position 1", "Position 2"],
      badgeText: "Proj1", // Example dynamic badge text
    },
    {
      title: "Project 2",
      group: "Group B",
      institution: "University B",
      description: "Another project description",
      followers: 850,
      likes: 150,
      positions: ["Position 3", "Position 4"],
      badgeText: "Proj2", // Example dynamic badge text
    },
    // More project objects...
  ];

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <ProjectCardLarge key={index} project={project} />
      ))}
    </div>
  );
};

// Export ProjectListPage as the default export
export default ProjectListPage;
