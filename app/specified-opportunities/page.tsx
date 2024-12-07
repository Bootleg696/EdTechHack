'use client'

import { useSearchParams } from 'next/navigation'
import SpecifiedOpportunitiesPage from '../components/SpecifiedOpportunities'
import BackButton from '../components/BackButton'

export default function SpecifiedOpportunitiesRoute() {
  const searchParams = useSearchParams()
  
  // Convert URL parameters back to an object
  const userFormData = Object.fromEntries(searchParams.entries())

  return (
    <>
      <SpecifiedOpportunitiesPage userFormData={userFormData} />
      <BackButton to="/opportunities" />
    </>
  )
} 
