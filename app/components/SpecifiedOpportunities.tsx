'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle } from 'lucide-react'

interface FormData {
  role: string;
  year: string;
  skills: string;
  university: string;
  work_rights: string;
}

interface SuggestionData {
  name: string;
  desc: string;
  url: string;
}

interface SpecifiedOpportunitiesProps {
  userFormData: FormData;
  clubData: SuggestionData;
  learningData: SuggestionData;
}

export default function SpecifiedOpportunitiesPage({ 
  userFormData, 
  clubData, 
  learningData 
}: SpecifiedOpportunitiesProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p><span className="font-medium">Role:</span> {userFormData.role}</p>
            <p><span className="font-medium">Year:</span> {userFormData.year}</p>
            <p><span className="font-medium">Skills:</span> {userFormData.skills}</p>
          </div>
          <div>
            <p><span className="font-medium">University:</span> {userFormData.university}</p>
            <p><span className="font-medium">Work Rights:</span> {userFormData.work_rights}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recommended Clubs</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">{clubData.name}</h4>
              <p className="text-gray-200">{clubData.desc}</p>
              {clubData.url && (
                <a 
                  href={clubData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-400 mt-2 inline-block"
                >
                  Visit Club →
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Learning Pathways</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">{learningData.name}</h4>
              <p className="text-gray-200">{learningData.desc}</p>
              {learningData.url && (
                <a 
                  href={learningData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-400 mt-2 inline-block"
                >
                  Start Learning →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
