'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addInfo } from '../actions/info'
import Groq from "groq-sdk";

interface FormData {
  role: string;
  year: string;
  skills: string;
  university: string;
  work_rights: string;
}

interface InfoFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  error: string;
}

export function InfoForm({ onSubmit, loading: isLoading, error: propError }: InfoFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string>(propError)
  const [formData, setFormData] = useState<FormData>({
    role: '',
    year: '',
    skills: '',
    university: '',
    work_rights: ''
  });

  const [clubData, setClubsData] = useState({
    name: '',
    desc: '',
    url: ''
  });

  const [learningData, setLearningData] = useState({
    name: '',
    desc: '',
    url: ''
  });

  const generateClubData = async (formValues: any) => {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helper that suggests university clubs based on student information. Return exactly one club suggestion in JSON format with name, description, and url fields."
        },
        {
          role: "user",
          content: `Suggest two clubs for a ${formValues.year} year student studying at ${formValues.university} with skills in ${formValues.skills} who wants to be a ${formValues.role}.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      stream: false
    });

    const suggestion = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
    setClubsData({
      name: suggestion.name || '',
      desc: suggestion.description || '',
      url: suggestion.url || ''
    });
  };

  const generateLearningData = async (formValues: any) => {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helper that suggests learning resources based on student information. Return exactly three learning resources suggestion in JSON format with name, description, and url fields."
        },
        {
          role: "user",
          content: `Suggest three learning resources for a ${formValues.year} year student with skills in ${formValues.skills} who wants to be a ${formValues.role}.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      stream: false
    });

    const suggestion = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
    setLearningData({
      name: suggestion.name || '',
      desc: suggestion.description || '',
      url: suggestion.url || ''
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const groq = new Groq({ 
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '' 
    });
    
    const formElement = e.currentTarget as HTMLFormElement;
    const formDataObj = new FormData(formElement);
    
    const newFormData = {
      role: formDataObj.get('role') as string,
      year: formDataObj.get('year') as string,
      skills: formDataObj.get('skills') as string,
      university: formDataObj.get('university') as string,
      work_rights: formDataObj.get('work_rights') as string
    };
    
    setFormData(newFormData);
    await onSubmit(newFormData);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input id="year" name="year" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input 
            id="skills" 
            name="skills" 
            placeholder="React, Next.js, TypeScript" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Input id="university" name="university" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="work_rights">Work Rights</Label>
          <Input id="work_rights" name="work_rights" required />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Info'}
        </Button>
      </form>
    </Card>
  )
}
