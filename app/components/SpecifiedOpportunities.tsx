'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle } from 'lucide-react'

const mockOpportunities = [
  {
    id: 1,
    title: 'Summer Internship at Tech Co',
    description: 'Join our team for a 12-week summer internship program and gain hands-on experience in software development. Work on real projects alongside experienced engineers.',
    deadline: '2024-05-15',
    skills: ['JavaScript', 'React', 'Node.js'],
    requirements: 'First-year students welcome',
  },
  {
    id: 2,
    title: 'Data Science Workshop Series',
    description: 'A 6-week workshop series covering the fundamentals of data science, including machine learning, data visualization, and statistical analysis.',
    timeline: 'Starts 2024-06-01',
    skills: ['Python', 'Statistics', 'Machine Learning'],
    requirements: 'Open to all university students',
  },
  {
    id: 3,
    title: 'Code for Good Hackathon',
    description: 'Participate in a weekend-long hackathon to solve real-world problems using technology. Collaborate with peers and industry mentors.',
    deadline: '2024-07-01',
    skills: ['Problem Solving', 'Teamwork', 'Any Programming Language'],
    requirements: 'Open to all skill levels',
  },
]

export default function SpecifiedOpportunitiesPage({ userFormData }) {
  const [selectedOpportunity, setSelectedOpportunity] = useState(mockOpportunities[0])

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <ScrollArea className="h-[600px] w-full lg:w-1/4 rounded-md border border-white/20 p-4 bg-white/10 backdrop-blur-lg">
        {mockOpportunities.map((opportunity) => (
          <Card
            key={opportunity.id}
            className="mb-4 cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => setSelectedOpportunity(opportunity)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-sm">{opportunity.title}</CardTitle>
              <CardDescription className="flex items-center text-gray-300 text-xs">
                {opportunity.deadline ? (
                  <Calendar className="h-3 w-3 mr-1" />
                ) : (
                  <Clock className="h-3 w-3 mr-1" />
                )}
                {opportunity.deadline || opportunity.timeline}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </ScrollArea>
      <div className="w-full lg:w-3/4">
        <Card className="bg-white/10 backdrop-blur-lg text-white h-full">
          <CardHeader>
            <CardTitle className="text-3xl">{selectedOpportunity.title}</CardTitle>
            <CardDescription className="flex items-center text-gray-300 text-lg">
              {selectedOpportunity.deadline ? (
                <Calendar className="h-6 w-6 mr-2" />
              ) : (
                <Clock className="h-6 w-6 mr-2" />
              )}
              {selectedOpportunity.deadline || selectedOpportunity.timeline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-xl">{selectedOpportunity.description}</p>
            <h4 className="font-semibold mb-2 flex items-center text-lg">
              <CheckCircle className="h-6 w-6 mr-2" />
              Skills Needed:
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedOpportunity.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-md">{skill}</Badge>
              ))}
            </div>
            <h4 className="font-semibold mb-2 flex items-center text-lg">
              <CheckCircle className="h-6 w-6 mr-2" />
              Requirements:
            </h4>
            <p className="text-lg">{selectedOpportunity.requirements}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}