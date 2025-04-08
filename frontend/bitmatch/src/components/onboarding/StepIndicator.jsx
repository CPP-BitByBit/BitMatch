export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center space-x-2 mt-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index + 1 === currentStep
        return (
          <div
            key={index}
            className={`rounded-full transition-all duration-300
              ${isActive
                ? "h-4 w-4 bg-black shadow-md"
                : "h-2 w-2 bg-gray-300"
              }
            `}
          />
        )
      })}
    </div>
  )
}
