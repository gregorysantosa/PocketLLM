'use client'

import { useState, KeyboardEvent } from 'react'

/**
 * InputBox Component
 *
 * Architecture Reference: HW3 Class Diagram - InputBox
 * - Chat input field component (Client Component)
 * - Handles user text input and submission
 *
 * Attributes:
 * - value: String
 * - isLoading: boolean
 *
 * Methods:
 * - handleChange(event): void
 * - handleSubmit(event): void
 * - clear(): void
 */

interface InputBoxProps {
  onSend: (content: string) => Promise<void>
  isLoading: boolean
}

export default function InputBox({ onSend, isLoading }: InputBoxProps) {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = async () => {
    if (!value.trim() || isLoading) return

    await onSend(value)
    clear()
  }

  const clear = () => {
    setValue('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-end space-x-2">
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !value.trim()}
          className={`px-6 py-2 rounded-lg font-medium ${
            isLoading || !value.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  )
}
