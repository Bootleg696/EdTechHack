'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, BookOpen, Users, Award, Calendar, Clock } from 'lucide-react'
import LoadingScreen from './LoadingScreen'

interface SuggestionData {
  name: string;
  desc: string;
  url: string;
}

interface OpportunitiesPageProps {
  onDiscoverNow: (section: string) => void;
  clubData: SuggestionData;
  learningData: SuggestionData;
}

export default function OpportunitiesPage({ onDiscoverNow, clubData, learningData }: OpportunitiesPageProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-center">Your Opportunities</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Suggested Clubs</h3>
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
                  Learn More →
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
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
                  Access Resource →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDiscoverNow('clubs')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Discover More Opportunities
      </button>
    </div>
  )
}
