'use client'

import { useState } from 'react'
import WelcomeSection from './components/WelcomeSection'
import UserFormPage from './components/UserFormPage'
import OpportunitiesPage from './components/OpportunitiesPage'
import SpecifiedOpportunitiesPage from './components/SpecifiedOpportunities'
import { Code, Laptop, GraduationCap } from 'lucide-react'

export default function Home() {
  const [currentSection, setCurrentSection] = useState('welcome')
  const [userFormData, setUserFormData] = useState({})

  const handleGetStarted = () => setCurrentSection('userForm')
  const handleFormSubmit = (formData) => {
    setUserFormData(formData)
    setCurrentSection('opportunities')
  }
  const handleDiscoverNow = (section) => {
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
        {currentSection === 'welcome' && <WelcomeSection onGetStarted={handleGetStarted} />}
        {currentSection === 'userForm' && <UserFormPage onSubmit={handleFormSubmit} />}
        {currentSection === 'opportunities' && <OpportunitiesPage onDiscoverNow={handleDiscoverNow} />}
        {currentSection === 'specifiedOpportunities' && <SpecifiedOpportunitiesPage userFormData={userFormData} />}
      </div>
    </main>
  )
}
