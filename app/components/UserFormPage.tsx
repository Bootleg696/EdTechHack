'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Database, Layout, Server, Cpu, Globe } from 'lucide-react'

const careerPaths = [
  { id: 'softwareEngineering', label: 'Software Engineering', icon: Code },
  { id: 'dataScience', label: 'Data Science', icon: Database },
]

const skillsByPath = {
  softwareEngineering: ['Java', 'Python', 'C++', 'Algorithms', 'Data Structures', 'Problem Solving'],
  dataScience: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
}

const commonSkills = ['Critical Thinking', 'Collaboration', 'Communication', 'Decision Making', 'Creativity']

const regions = ['NSW', 'QLD', 'VIC', 'WA', 'SA', 'TAS', 'NT', 'ACT']

export default function UserFormPage({ onSubmit }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    careerPath: '',
    skills: [],
    workingRights: '',
    region: '',
  })

  const handleCareerPathChange = (value) => {
    setFormData({ ...formData, careerPath: value, skills: [] })
    setStep(2)
  }

  const handleSkillChange = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill]
    setFormData({ ...formData, skills: updatedSkills })
  }

  const handleWorkingRightsChange = (value) => {
    setFormData({ ...formData, workingRights: value })
    setStep(4)
  }

  const handleRegionChange = (value) => {
    setFormData({ ...formData, region: value })
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Career Path Guide</CardTitle>
        </CardHeader>
        <CardContent>
          {step >= 1 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select your career path:</h3>
              <RadioGroup onValueChange={handleCareerPathChange} value={formData.careerPath} className="grid grid-cols-2 gap-4">
                {careerPaths.map((path) => {
                  const Icon = path.icon
                  return (
                    <div key={path.id} className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg">
                      <RadioGroupItem value={path.id} id={path.id} />
                      <Label htmlFor={path.id} className="flex items-center space-x-2 cursor-pointer">
                        <Icon className="h-5 w-5" />
                        <span>{path.label}</span>
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>
          )}

          {step >= 2 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select skills you will like to learn:</h3>
              <div className="grid grid-cols-2 gap-2">
                {[...skillsByPath[formData.careerPath], ...commonSkills].map((skill) => (
                  <div key={skill} className="flex items-center space-x-2 bg-white/5 p-2 rounded">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillChange(skill)}
                    />
                    <label htmlFor={skill}>{skill}</label>
                  </div>
                ))}
              </div>
              <Button className="mt-4" onClick={() => setStep(3)}>Next</Button>
            </div>
          )}

          {step >= 3 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Working Rights:</h3>
              <RadioGroup onValueChange={handleWorkingRightsChange} value={formData.workingRights} className="space-y-2">
                <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg">
                  <RadioGroupItem value="citizen" id="citizen" />
                  <Label htmlFor="citizen" className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Australian or New Zealand Citizen</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5" />
                    <span>Other</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step >= 4 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select your region:</h3>
              <Select onValueChange={handleRegionChange} value={formData.region}>
                <SelectTrigger className="w-full bg-white/5 text-white">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="mt-6 w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white" onClick={handleSubmit}>
                Generate Opportunities
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}