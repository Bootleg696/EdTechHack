'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addInfo } from '../actions/info'
import Groq from "groq-sdk";

export function InfoForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
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

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const generateClubData = async (formValues: any) => {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helper that suggests university clubs based on student information. Return exactly one club suggestion in JSON format with name, description, and url fields."
        },
        {
          role: "user",
          content: `Suggest a club for a ${formValues.year} year student studying at ${formValues.university} with skills in ${formValues.skills} who wants to be a ${formValues.role}.`
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
          content: `Suggest a learning resource for a ${formValues.year} year student with skills in ${formValues.skills} who wants to be a ${formValues.role}.`
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
    
    const formElement = e.currentTarget as HTMLFormElement;
    const formDataObj = new FormData(formElement);
    
    setFormData({
      role: formDataObj.get('role') as string,
      year: formDataObj.get('year') as string,
      skills: formDataObj.get('skills') as string,
      university: formDataObj.get('university') as string,
      work_rights: formDataObj.get('work_rights') as string
    });

    setLoading(true);
    setError('');

    try {
      await Promise.all([
        generateClubData(formData),
        generateLearningData(formData)
      ]);

      const enrichedFormData = new FormData(formElement);
      enrichedFormData.append('club_name', clubData.name);
      enrichedFormData.append('club_desc', clubData.desc);
      enrichedFormData.append('club_url', clubData.url);
      enrichedFormData.append('learning_name', learningData.name);
      enrichedFormData.append('learning_desc', learningData.desc);
      enrichedFormData.append('learning_url', learningData.url);

      const result = await addInfo(enrichedFormData);

      if (!result?.success) {
        setError(result?.error || 'An error occurred');
        setLoading(false);
        return;
      }

      router.refresh();
      setLoading(false);
      formElement.reset();
    } catch (err) {
      setError('Failed to generate suggestions');
      setLoading(false);
    }
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Adding...' : 'Add Info'}
        </Button>
      </form>
    </Card>
  )
}
