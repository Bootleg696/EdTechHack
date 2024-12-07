'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, BookOpen, Users, Award, Calendar, Clock } from 'lucide-react'
import LoadingScreen from './LoadingScreen'


const categories = [
  {
    title: 'Internships',
    icon: Briefcase,
    description: 'Gain hands-on experience with industry leaders',
    opportunities: [
      {
        id: 1,
        title: 'STEP Intern at Google',
        deadline: '2024-04-30',
        skills: ['Python', 'Data Structures', 'Machine Learning'],
      },
      {
        id: 2,
        title: 'Summer Internship at Optiver',
        deadline: '2024-07-15',
        skills: ['C++', 'Algorithmic Trading', 'Statistics'],
      },
      {
        id: 3,
        title: 'Summer Internship at IMC',
        deadline: '2024-07-28',
        skills: ['Java', 'Problem Solving', 'Distributed Systems'],
      },
      {
        id: 4,
        title: 'Traineeship at PWC',
        deadline: '2024-07-30',
        skills: ['Accounting', 'Excel', 'Business Analysis'],
      },
      {
        id: 5,
        title: 'University Paid Internship at ATO',
        deadline: '2024-08-15', // Randomly assigned deadline
        skills: ['Taxation', 'Government Policy', 'Analytical Thinking'],
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
        title: 'Roadmap.sh',
        timeline: 'Starts 2024-06-01',
        skills: ['Front End', 'Back End', 'Full Stack'],
      },
      {
        id: 4,
        title: 'Neetcode.io',
        timeline: 'Starts 2024-07-01',
        skills: ['Data Structures','Algorithms'],
      },
    ]
  },
  {
    title: 'Programs',
    icon: Award,
    description: 'Join structured development programs',
    opportunities: [
      {
        id: 1,
        title: 'Me @ Deloitte',
        deadline: '2024-12-31',
        skills: ['Consulting', 'Strategic Planning', 'Team Collaboration'],
      },
      {
        id: 2,
        title: 'KPMG Foundations Program',
        deadline: '2024-11-30',
        skills: ['Business Analysis', 'Data Visualization', 'Communication'],
      },
      {
        id: 3,
        title: 'EY Career Compass',
        deadline: '2025-01-15',
        skills: ['Career Development', 'Public Speaking', 'Leadership'],
      },
      {
        id: 4,
        title: 'Microsoft Student Accelerator',
        deadline: '2024-12-15',
        skills: ['Cloud Computing', 'Software Development', 'AI and Machine Learning'],
      },
      {
        id: 5,
        title: 'Startmate Student Fellowship',
        deadline: '2025-02-01',
        skills: ['Startup Strategy', 'Entrepreneurship', 'Networking'],
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
        title: 'UNSW CSESOC',
        timeline: 'Closed',
        skills: ['Networking', 'Leadership', 'Tech'],
      },
      {
        id: 8,
        title: 'UNSW AI Society',
        timeline: 'Ongoing',
        skills: ['Programming', 'AI', 'Learning'],
      },
    ]
  },
]

export default function OpportunitiesPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-12 text-center">Explore Opportunities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => {
          // Get 2 random opportunities from the category
          const randomOpportunities = ['Internships', 'Programs'].includes(category.title)
            ? category.opportunities
                .sort(() => Math.random() - 0.5)
                .slice(0, 2)
            : category.opportunities;

          return (
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
                {randomOpportunities.map((opportunity) => (
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
          );
        })}
      </div>
    </div>
  )
}