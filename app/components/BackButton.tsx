'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ to = '/' }) {
  const router = useRouter()

  return (
    <div className="flex justify-center mt-8">
      <Button 
        variant="ghost" 
        onClick={() => router.push(to)}
        className="flex items-center gap-2 hover:bg-transparent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </div>
  )
} 