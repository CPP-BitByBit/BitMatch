import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProjectCardLarge({ project, highlighted = false }) {
  // Helper function to format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`.replace(".0M", "M");
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`.replace(".0K", "K");
    } else {
      return num; // Return the number as is, no need to call .toString()
    }
  };

  // Highlighted border class logic (does not affect hover state, only initial state)
  const borderClass = highlighted
    ? "border-2 border-gray-200"
    : "border border-gray-200";

  return (
    <div
      className={`flex flex-col h-full ${borderClass} rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg`}
    >
      <Link to={`/projects/${project.id}`}>
        {/* Header */}
        <div className="bg-gray-800 text-white p-2 flex justify-between">
          <span>{project.group}</span>
        </div>

        {/* Image Placeholder */}
        <div className="relative">
          {/* Match Percentage */}
          <div
            className={`absolute top-2 left-2 text-xs px-2 py-1 rounded font-bold ${
              project.match_percentage >= 90
                ? "bg-green-700 text-white"
                : project.match_percentage >= 80
                ? "bg-green-600 text-white"
                : project.match_percentage >= 70
                ? "bg-yellow-600 text-white"
                : project.match_percentage >= 60
                ? "bg-yellow-500 text-white"
                : project.match_percentage >= 50
                ? "bg-yellow-400 text-white"
                : project.match_percentage >= 40
                ? "bg-orange-600 text-white"
                : project.match_percentage >= 30
                ? "bg-orange-500 text-white"
                : project.match_percentage >= 20
                ? "bg-red-600 text-white"
                : "bg-red-700 text-white"
            }`}
          >
            {project.match_percentage}% Match
          </div>

          {/* Image */}
          <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500 text-sm">
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
        </div>

        {/* Content Wrapper */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg">{project.title}</h3>
          <p className="text-sm text-gray-500">{project.institution}</p>
          <p className="text-sm">{project.description}</p>

          {/* Followers & Likes */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-400">~</span>
              <span>{formatNumber(project.followers_count)} Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">~</span>
              <span>{formatNumber(project.likes_count)} Likes</span>
            </div>
          </div>

          {/* Top Positions Needed */}
          <div className="mt-2">
            <h4 className="font-bold text-sm uppercase">
              Top Positions Needed
            </h4>
            <div className="flex mt-1">
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
    match_percentage: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    followers_count: PropTypes.number.isRequired,
    likes_count: PropTypes.number.isRequired,
    positions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    image_url: PropTypes.string,
  }).isRequired,
  highlighted: PropTypes.bool,
};
