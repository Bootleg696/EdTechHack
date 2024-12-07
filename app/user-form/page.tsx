'use client'

import { useRouter } from 'next/navigation'
import UserFormPage from '../components/UserFormPage'

export default function UserFormRoute() {
  const router = useRouter()
  
  const handleSubmit = (formData) => {
    // Encode the form data as URL parameters
    const params = new URLSearchParams(formData)
    router.push('/opportunities?' + params.toString())
  }

  return <UserFormPage onSubmit={handleSubmit} />
} 

