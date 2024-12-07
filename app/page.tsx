'use client'

import { useState } from 'react'
import Groq from "groq-sdk";
import WelcomeSection from './components/WelcomeSection'
import UserFormPage from './components/UserFormPage'
import OpportunitiesPage from './components/OpportunitiesPage'
import SpecifiedOpportunitiesPage from './components/SpecifiedOpportunities'
import { Code, Laptop, GraduationCap } from 'lucide-react'

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

export default function Home() {
  const [currentSection, setCurrentSection] = useState('welcome')
  const [userFormData, setUserFormData] = useState<FormData>({
    role: '',
    year: '',
    skills: '',
    university: '',
    work_rights: ''
  })
  const [clubData, setClubData] = useState<SuggestionData>({
    name: '',
    desc: '',
    url: ''
  })
  const [learningData, setLearningData] = useState<SuggestionData>({
    name: '',
    desc: '',
    url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true});

  const generateSuggestions = async (formData: FormData) => {
    try {
      const [clubResponse, learningResponse] = await Promise.all([
        groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a helper that suggests university clubs based on student information. Return exactly two club suggestions in JSON format with name, description, and url fields."
            },
            {
              role: "user",
              content: `Suggest two clubs for a ${formData.year} year student studying at ${formData.university} with skills in ${formData.skills} who wants to be a ${formData.role}.`
            }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.5,
          stream: false
        }),
        groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a helper that suggests learning resources based on student information. Return exactly three learning resources suggestion in JSON format with name, description, and url fields."
            },
            {
              role: "user",
              content: `Suggest three learning resources for a ${formData.year} year student with skills in ${formData.skills} who wants to be a ${formData.role}.`
            }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.5,
          stream: false
        })
      ]);

      const clubSuggestion = JSON.parse(clubResponse.choices[0]?.message?.content || '{}');
      const learningSuggestion = JSON.parse(learningResponse.choices[0]?.message?.content || '{}');

      setClubData(clubSuggestion);
      setLearningData(learningSuggestion);
    } catch (err) {
      setError('Failed to generate suggestions');
      throw err;
    }
  };

  const handleGetStarted = () => setCurrentSection('userForm')
  
  const handleFormSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    try {
      setUserFormData(formData);
      await generateSuggestions(formData);
      setCurrentSection('opportunities');
    } catch (err) {
      setError('Failed to process form data');
    } finally {
      setLoading(false);
    }
  }
  
  const handleDiscoverNow = (section: string) => {
    setCurrentSection('specifiedOpportunities')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Career Horizon</h1>
          </div>
          <nav className="flex space-x-4">
            <Laptop className="h-6 w-6" />
            <GraduationCap className="h-6 w-6" />
          </nav>
        </header>
        
        {currentSection === 'welcome' && 
          <WelcomeSection onGetStarted={handleGetStarted} />
        }
        {currentSection === 'userForm' && 
          <UserFormPage onSubmit={handleFormSubmit} loading={loading} error={error} />
        }
        {currentSection === 'opportunities' && 
          <OpportunitiesPage 
            onDiscoverNow={handleDiscoverNow} 
            clubData={clubData}
            learningData={learningData}
          />
        }
        {currentSection === 'specifiedOpportunities' && 
          <SpecifiedOpportunitiesPage 
            userFormData={userFormData} 
            clubData={clubData}
            learningData={learningData}
          />
        }
      </div>
    </main>
  )
}
