import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <p className="text-white text-lg">Finding opportunities that match your profile...</p>
      </div>
    </div>
  )
} 