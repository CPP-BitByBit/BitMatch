import { Button } from "@/components/ui/button"

export default function ProjectCardLarge({ project, highlighted = false }) {
  // Helper function to format large numbers
  const formatNumber = (num) => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(1)}M`.replace(".0M", "M")
      : num >= 1000
      ? `${(num / 1000).toFixed(1)}K`.replace(".0K", "K")
      : num.toString()
  }

  // Highlighted border class logic (does not affect hover state, only initial state)
  const borderClass = highlighted ? "border-2 border-gray-200" : "border border-gray-200"

  return (
    <div
      className={`flex flex-col ${borderClass} rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg`}
    >
      {/* Header */}
      <div className="bg-gray-800 text-white p-2 flex justify-between">
        <Button variant="ghost" size="sm" className="text-white hover:text-white p-0 h-auto">
          Assign a Group
        </Button>
        <span>{project.group}</span>
      </div>

      {/* Image Placeholder with Match Percentage */}
      <div className="relative">
        <div className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded">
          {project.matchPercentage}% Match
        </div>
        <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500 text-sm">
          Cover Image goes here
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
          <h4 className="font-bold text-sm uppercase">Top Positions Needed</h4>
          <div className="flex mt-1">
            {/* Split positions into two columns */}
            <ul className="w-1/2">
              {project.positions.slice(0, Math.ceil(project.positions.length / 2)).map((position, index) => (
                <li key={index} className="text-sm flex items-center gap-1">
                  <span className="text-gray-400">•</span>
                  {position.title}
                </li>
              ))}
            </ul>
            <ul className="w-1/2">
              {project.positions.slice(Math.ceil(project.positions.length / 2)).map((position, index) => (
                <li key={index} className="text-sm flex items-center gap-1">
                  <span className="text-gray-400">•</span>
                  {position.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
