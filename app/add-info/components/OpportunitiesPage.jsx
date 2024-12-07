import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, BookOpen, Users, Award } from 'lucide-react'

const opportunities = [
  {
    title: 'Internships',
    description: 'Gain hands-on experience in your chosen field with internships at top companies.',
    icon: Briefcase,
  },
  {
    title: 'Learning',
    description: 'Enhance your skills with online courses, workshops, and tutorials tailored to your career path.',
    icon: BookOpen,
  },
  {
    title: 'Programs',
    description: 'Participate in industry programs designed to nurture and develop emerging talent.',
    icon: Award,
  },
  {
    title: 'Clubs/Society',
    description: 'Connect with like-minded peers and industry professionals through university clubs and societies.',
    icon: Users,
  },
]

export default function OpportunitiesPage({ onDiscoverNow }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Explore Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {opportunities.map((opportunity) => {
          const Icon = opportunity.icon
          return (
            <Card key={opportunity.title} className="bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-colors">
              <CardHeader>
                <Icon className="h-12 w-12 mb-4" />
                <CardTitle>{opportunity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-200">{opportunity.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button onClick={() => onDiscoverNow(opportunity.title)} className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                  Discover Now
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
