import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, BookOpen, Users, Award, Calendar, Clock } from 'lucide-react'

const categories = [
  {
    title: 'Internships',
    icon: Briefcase,
    description: 'Gain hands-on experience with industry leaders',
    opportunities: [
      {
        id: 1,
        title: 'Summer Internship at Tech Co',
        deadline: '2024-05-15',
        skills: ['JavaScript', 'React', 'Node.js'],
      },
      {
        id: 2,
        title: 'Software Development Intern',
        deadline: '2024-06-01',
        skills: ['Python', 'Django', 'SQL'],
      },
    ]
  },
  {
    title: 'Learning',
    icon: BookOpen,
    description: 'Expand your knowledge and skills',
    opportunities: [
      {
        id: 3,
        title: 'Data Science Workshop Series',
        timeline: 'Starts 2024-06-01',
        skills: ['Python', 'Statistics', 'ML'],
      },
      {
        id: 4,
        title: 'Web Development Bootcamp',
        timeline: 'Starts 2024-07-01',
        skills: ['HTML', 'CSS', 'JavaScript'],
      },
    ]
  },
  {
    title: 'Programs',
    icon: Award,
    description: 'Join structured development programs',
    opportunities: [
      {
        id: 5,
        title: 'Code for Good Hackathon',
        deadline: '2024-07-01',
        skills: ['Problem Solving', 'Teamwork', 'Coding'],
      },
      {
        id: 6,
        title: 'Tech Leadership Program',
        deadline: '2024-08-01',
        skills: ['Leadership', 'Communication', 'Tech'],
      },
    ]
  },
  {
    title: 'Clubs/Society',
    icon: Users,
    description: 'Connect with like-minded peers',
    opportunities: [
      {
        id: 7,
        title: 'Tech Society Membership',
        timeline: 'Ongoing',
        skills: ['Networking', 'Leadership', 'Tech'],
      },
      {
        id: 8,
        title: 'Coding Club',
        timeline: 'Weekly Meetings',
        skills: ['Programming', 'Collaboration', 'Learning'],
      },
    ]
  },
]

export default function OpportunitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-12 text-center">Explore Opportunities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category.title} className="space-y-6">
            <div className="flex flex-col items-center text-center gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-full">
                <category.icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {category.opportunities.map((opportunity) => (
                <Card 
                  key={opportunity.id} 
                  className="bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <CardDescription className="flex items-center text-gray-300">
                      {opportunity.deadline ? (
                        <>
                          <Calendar className="h-4 w-4 mr-1" />
                          Deadline: {opportunity.deadline}
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 mr-1" />
                          {opportunity.timeline}
                        </>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
