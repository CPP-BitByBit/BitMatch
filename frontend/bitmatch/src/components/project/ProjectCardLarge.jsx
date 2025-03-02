import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropTypes from "prop-types"; // Import PropTypes for validation

// ProjectCardLarge component
export default function ProjectCardLarge({ project }) {
  // Ensure the function handles cases where project.followers or project.likes may be undefined
  const formatNumber = (num) => (num ? num.toLocaleString() : "0");

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <div className="relative">
        <Badge className="absolute left-0 top-0 rounded-none rounded-br-md bg-gray-100 text-gray-800 font-normal">
          {project.badgeText || "Default Badge"} {/* Dynamically set badge text */}
        </Badge>

        <div className="flex items-center justify-between p-1 bg-white">
          <Button variant="default" size="sm" className="bg-black text-white hover:bg-gray-800 text-xs rounded-sm h-7">
            Assign a Group
          </Button>
          <span className="text-sm truncate max-w-[150px]">{project.group}</span>
        </div>

        <div className="bg-gray-200 h-44 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Cover Image goes here</p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{project.institution}</p>
        <p className="text-sm mb-4">{project.description}</p>

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <div>
            <span className="text-gray-400">◉</span> {formatNumber(project.followers)} Followers
          </div>
          <div>
            <span className="text-gray-400">◉</span> {formatNumber(project.likes)} Likes
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-bold text-sm mb-2">TOP POSITIONS NEEDED</h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0">
            {project.positions?.map((position, index) => (
              <div key={index} className="flex items-center">
                <span className="text-xs mr-1">•</span>
                <span className="text-sm">{position}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="destructive" size="sm" className="text-xs h-8 bg-red-400 hover:bg-red-500">
            Delete
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 bg-gray-200 hover:bg-gray-300">
            Edit Listing
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8 bg-gray-200 hover:bg-gray-300">
            Go to Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

// Prop types validation
ProjectCardLarge.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    group: PropTypes.string,
    institution: PropTypes.string,
    description: PropTypes.string,
    followers: PropTypes.number,
    likes: PropTypes.number,
    positions: PropTypes.arrayOf(PropTypes.string),
    badgeText: PropTypes.string, // Added for badge text
  }).isRequired,
};
