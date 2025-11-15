'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import ChatInterface from '@/components/ChatInterface'

/**
 * ChatPage Component
 *
 * Architecture Reference: HW3 Class Diagram - ChatPage extends PageComponent
 * - Page-level component for chat functionality
 * - Protected route (requires authentication)
 * - Renders ChatInterface component
 *
 * Attributes:
 * - chatService: ChatService
 *
 * Methods:
 * - handleSubmit(message): Promise<void>
 */

export default function ChatPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatInterface />
    </div>
  )
}
