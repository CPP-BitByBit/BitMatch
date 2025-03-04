import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProjectCardLarge({ project, highlighted = false }) {
  // Helper function to format large numbers
  const formatNumber = (num) => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(1)}M`.replace(".0M", "M")
      : num >= 1000
      ? `${(num / 1000).toFixed(1)}K`.replace(".0K", "K")
      : num.toString();
  };

  // Highlighted border class logic (does not affect hover state, only initial state)
  const borderClass = highlighted
    ? "border-2 border-gray-200"
    : "border border-gray-200";

  return (
    <div
      className={`flex flex-col ${borderClass} rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg`}
    >
      <Link to={`/projects/${project.id - 1}`}>
        {/* Header */}
        <div className="bg-gray-800 text-white p-2 flex justify-between">
          <span>{project.group}</span>
        </div>

        {/* Image Placeholder with Match Percentage */}
        <div className="relative">
          {/* Conditional background color based on match percentage */}
          <div
            className={`absolute top-2 left-2 text-xs px-2 py-1 rounded font-bold ${
              project.matchPercentage >= 90
                ? "bg-green-700 text-white"
                : project.matchPercentage >= 80
                ? "bg-green-600 text-white"
                : project.matchPercentage >= 70
                ? "bg-yellow-600 text-white"
                : project.matchPercentage >= 60
                ? "bg-yellow-500 text-white"
                : project.matchPercentage >= 50
                ? "bg-yellow-400 text-white"
                : project.matchPercentage >= 40
                ? "bg-orange-600 text-white"
                : project.matchPercentage >= 30
                ? "bg-orange-500 text-white"
                : project.matchPercentage >= 20
                ? "bg-red-600 text-white"
                : "bg-red-700 text-white"
            }`}
          >
            {project.matchPercentage}% Match
          </div>

          {/* Use project.imageUrl to display the actual image */}
          <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500 text-sm">
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
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-bold text-lg">{project.title}</h3>
          <p className="text-sm text-gray-500">{project.institution}</p>
          <p className="text-sm">{project.description}</p>

          {/* Followers & Likes */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-400">~</span>
              <span>{formatNumber(project.followers)} Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">~</span>
              <span>{formatNumber(project.likes)} Likes</span>
            </div>
          </div>

          {/* Top Positions Needed */}
          <div className="mt-2">
            <h4 className="font-bold text-sm uppercase">
              Top Positions Needed
            </h4>
            <div className="flex mt-1">
              {/* Split positions into two columns */}
              <ul className="w-1/2">
                {project.positions
                  .slice(0, Math.ceil(project.positions.length / 2))
                  .map((position, index) => (
                    <li key={index} className="text-sm flex items-center gap-1">
                      <span className="text-gray-400">•</span>
                      {position.title}
                    </li>
                  ))}
              </ul>
              <ul className="w-1/2">
                {project.positions
                  .slice(Math.ceil(project.positions.length / 2))
                  .map((position, index) => (
                    <li key={index} className="text-sm flex items-center gap-1">
                      <span className="text-gray-400">•</span>
                      {position.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// PropTypes validation
ProjectCardLarge.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    group: PropTypes.string.isRequired,
    matchPercentage: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    positions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  highlighted: PropTypes.bool,
};
