'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addInfo } from '../actions/info'

export function InfoForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')

    const result = await addInfo(formData)

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.refresh()
    setLoading(false)
    // Reset form
    const form = document.querySelector('form') as HTMLFormElement
    form.reset()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <form action={handleSubmit} className="space-y-6">
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
