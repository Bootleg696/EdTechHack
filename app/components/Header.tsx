'use client'

import { useRouter } from 'next/navigation'
import { Code, Laptop, GraduationCap } from 'lucide-react'

export default function Header() {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between mb-8">
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={() => router.push('/')}
      >
        <Code className="h-8 w-8" />
        <h1 className="text-2xl font-bold">Career Horizon</h1>
      </div>
      <nav className="flex space-x-4">
        <Laptop className="h-6 w-6" />
        <GraduationCap className="h-6 w-6" />
      </nav>
    </header>
  )
} 