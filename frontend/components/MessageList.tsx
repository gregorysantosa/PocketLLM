'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/contexts/ChatContext'

/**
 * MessageList Component
 *
 * Architecture Reference: HW3 Class Diagram - MessageList
 * - Renders chat message history (Client Component)
 * - Auto-scrolls to latest message
 *
 * Attributes:
 * - messages: Array<Message>
 *
 * Methods:
 * - renderMessage(message): JSX.Element
 * - scrollToLatest(): void
 */

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToLatest = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToLatest()
  }, [messages])

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user'

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-lg px-4 py-2 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          <div className="flex items-start space-x-2">
            <div className="flex-1">
              <div className="text-xs opacity-75 mb-1">
                {isUser ? 'You' : 'Assistant'}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs opacity-50 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <p className="text-lg mb-2">Welcome to PocketLLM Portal</p>
            <p className="text-sm">Send a message to start chatting</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}
