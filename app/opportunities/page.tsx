'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import OpportunitiesPage from '../components/OpportunitiesPage'
import BackButton from '../components/BackButton'

export default function OpportunitiesRoute() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const handleDiscoverNow = () => {
    router.push('/specified-opportunities?' + searchParams.toString())
  }

  return (
    <>
      <OpportunitiesPage onDiscoverNow={handleDiscoverNow} />
      <BackButton to="/user-form" />
    </>
  )
} 
