'use client'

import { useRouter } from 'next/navigation'
import WelcomeSection from './components/WelcomeSection'

export default function Home() {
  const router = useRouter()

  return <WelcomeSection onGetStarted={() => router.push('/user-form')} />
}
