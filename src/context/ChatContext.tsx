import React, { createContext, useContext, useState } from 'react';
import { useSession } from './SessionContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  studentId: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface MessageFeedback {
  clarity: number;
  specificity: number;
  context: number;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  getMessageFeedback: (messageId: string) => MessageFeedback | null;
  currentTypingMessage: string;
  setCurrentTypingMessage: (message: string) => void;
  getMessagesForStudent: (studentId: string) => Message[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');
  const { activeStudentId } = useSession();

  const sendMessage = async (content: string) => {
    if (!activeStudentId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      studentId: activeStudentId,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: `Response from ${selectedModel}: ${content}`,
      sender: 'ai',
      studentId: activeStudentId,
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const getMessagesForStudent = (studentId: string) => {
    return messages.filter(m => m.studentId === studentId);
  };

  // Simulate message quality feedback
  const getMessageFeedback = (messageId: string): MessageFeedback | null => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return null;

    // Generate consistent feedback based on message content
    const content = message.content.toLowerCase();
    return {
      clarity: content.includes('?') ? 8.5 : 6.0,
      specificity: content.length > 50 ? 9.0 : 5.0,
      context: content.includes('because') || content.includes('context') ? 9.0 : 6.0,
    };
  };

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        sendMessage, 
        selectedModel, 
        setSelectedModel,
        getMessageFeedback,
        currentTypingMessage,
        setCurrentTypingMessage,
        getMessagesForStudent,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};