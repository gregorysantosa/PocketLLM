import { useState, useEffect } from 'react'
import { Message } from '@/contexts/ChatContext'

/**
 * useHistory Hook
 *
 * Architecture Reference: HW3 Class Diagram - useHistory
 * - Custom React Hook for history functionality
 * - Fetches conversation history
 * - Provides history operations
 *
 * Methods:
 * - fetchHistory(page, limit): Promise<Array>
 * - clearHistory(): Promise<void>
 */

interface HistorySession {
  sessionId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export function useHistory() {
  const [history, setHistory] = useState<HistorySession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHistory = async (page: number = 1, limit: number = 10) => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(
        `/api/history?page=${page}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }

      const data = await response.json()
      setHistory(data.sessions || [])
      return data.sessions
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('/api/history', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to clear history')
      }

      setHistory([])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
    }
  }

  return {
    history,
    isLoading,
    error,
    fetchHistory,
    clearHistory,
  }
}
