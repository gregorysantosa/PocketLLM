'use client'

import { useChat } from '@/hooks/useChat'
import MessageList from './MessageList'
import InputBox from './InputBox'

/**
 * ChatInterface Component
 *
 * Architecture Reference: HW3 Class Diagram - ChatInterface
 * - Main chat UI component (Client Component)
 * - Contains MessageList and InputBox
 * - Uses useChat hook for state management
 *
 * Attributes:
 * - messages: Array<Message>
 * - inputRef: Ref
 *
 * Methods:
 * - sendMessage(text): void
 * - updateMessages(message): void
 * - scrollToBottom(): void
 */

export default function ChatInterface() {
  const { messages, sendMessage, isLoading } = useChat()

  const handleSendMessage = async (content: string) => {
    await sendMessage(content)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message Display Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white">
        <InputBox onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
