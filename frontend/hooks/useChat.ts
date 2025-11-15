import { useChatContext } from '@/contexts/ChatContext'

/**
 * useChat Hook
 *
 * Architecture Reference: HW3 Class Diagram - useChat
 * - Custom React Hook for chat functionality
 * - Manages chat state and WebSocket connection (future)
 * - Provides message sending operations
 *
 * Attributes:
 * - wsClient: WebSocketClient (future implementation)
 *
 * Methods:
 * - sendMessage(text): Promise<void>
 * - subscribeToMessages(callback): void
 * - disconnect(): void
 */

export function useChat() {
  const {
    messages,
    sessionId,
    isLoading,
    sendMessage,
    addMessage,
    clearMessages,
  } = useChatContext()

  return {
    messages,
    sessionId,
    isLoading,
    sendMessage: async (text: string) => {
      await sendMessage(text)
    },
    addMessage,
    clearMessages,
    // Future: WebSocket support
    // subscribeToMessages: (callback: Function) => {},
    // disconnect: () => {},
  }
}
