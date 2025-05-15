import { Rocket, User, Briefcase, Heart } from "lucide-react"

interface StageIndicatorProps {
  currentStage: number
}

export function StageIndicator({ currentStage }: StageIndicatorProps) {
  const stages = [
    { number: 1, title: "Personal Information", icon: <User className="h-4 w-4" /> },
    { number: 2, title: "Travel Preferences", icon: <Briefcase className="h-4 w-4" /> },
    { number: 3, title: "Health and Safety", icon: <Heart className="h-4 w-4" /> },
  ]

  return (
    <div className="relative mb-8 px-4">
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <div key={stage.number} className="flex flex-col items-center z-10">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                currentStage === stage.number
                  ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                  : currentStage > stage.number
                    ? "bg-secondary text-white"
                    : "bg-white/80 text-space-800"
              }`}
            >
              {stage.icon}
            </div>
            <span
              className={`mt-2 font-medium text-center transition-all duration-200 ${
                currentStage === stage.number ? "text-white" : "text-space-200"
              } text-xs sm:text-sm whitespace-nowrap`}
            >
              {stage.title}
            </span>
          </div>
        ))}

        {/* Progress rocket */}
        <div
          className="absolute top-6 transform -translate-y-1/2 transition-all duration-500 z-20"
          style={{
            left: `calc(${((currentStage - 1) / (stages.length - 1)) * 100}% - ${currentStage === 1 ? "0px" : currentStage === stages.length ? "24px" : "12px"})`,
          }}
        >
          <div className="relative">
            <Rocket
              className="h-6 w-6 text-white rotate-90 animate-float"
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" }}
            />
            <div className="absolute bottom-0 left-1/2 w-1 h-6 bg-gradient-to-t from-primary to-transparent opacity-70"></div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-6 left-0 w-full flex items-center px-6 z-0">
        <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${((currentStage - 1) / (stages.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
