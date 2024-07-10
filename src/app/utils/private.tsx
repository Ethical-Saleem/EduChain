'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '../features/hooks/useAuth'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'


export function PrivateOutlet({ children }) {
  const token = useAuth()
  console.log('token', token);
  const router = useRouter();

  if (!token) {
    router.push("/login")
  }

  return children
}