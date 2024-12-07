import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RocketIcon as RocketLaunch, Binary, Cpu } from 'lucide-react'

export default function WelcomeSection({ onGetStarted }) {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-8 animate-pulse">Welcome to Career Horizon!</h1>
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg text-white">
        <CardHeader>
          <CardTitle className="text-3xl">Your Guide to Computer Science Careers</CardTitle>
          <CardDescription className="text-gray-200">Find your suitable pathway in computer science!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-8 mb-6">
            <div className="flex flex-col items-center">
              <RocketLaunch className="h-12 w-12 mb-2" />
              <span>Launch Your Career</span>
            </div>
            <div className="flex flex-col items-center">
              <Binary className="h-12 w-12 mb-2" />
              <span>Learn to Code</span>
            </div>
            <div className="flex flex-col items-center">
              <Cpu className="h-12 w-12 mb-2" />
              <span>Explore Tech</span>
            </div>
          </div>
          <p className="mb-6">
            As a first-year student, you're at the beginning of an exciting journey. Career Horizon is here to help you
            navigate the vast world of computer science and find the path that's right for you. We'll guide you through
            various career options, help you identify your skills, and connect you with relevant opportunities.
          </p>
          <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
