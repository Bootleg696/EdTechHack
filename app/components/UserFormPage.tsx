'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Database, Layout, Server, Cpu, Globe } from 'lucide-react'
import { InfoForm } from './info-form'

interface FormData {
  role: string;
  year: string;
  skills: string;
  university: string;
  work_rights: string;
}

interface UserFormPageProps {
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function UserFormPage({ onSubmit, loading, error }: UserFormPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Tell us about yourself</h2>
      <InfoForm onSubmit={onSubmit} loading={loading} error={error} />
    </div>
  )
}