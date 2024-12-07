'use client'

import { useRouter } from 'next/navigation'
import OpportunitiesPage from '../components/OpportunitiesPage'
import BackButton from '../components/BackButton'

export default function OpportunitiesRoute() {
  const router = useRouter()
  
  return (
    <>
      <OpportunitiesPage />
      <BackButton to="/user-form" />
    </>
  )
} 
