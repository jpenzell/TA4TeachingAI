import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useSession } from '../context/SessionContext';

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, currentTypingMessage, setCurrentTypingMessage } = useChat();
  const { activeStudentId, isTeacherView } = useSession();

  // Update typing message for real-time viewing by teacher
  useEffect(() => {
    if (!isTeacherView) {
      setCurrentTypingMessage(input);
    }
  }, [input, setCurrentTypingMessage, isTeacherView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
      setCurrentTypingMessage('');
    }
  };

  const relevantMessages = activeStudentId ? messages.filter(m => m.studentId === activeStudentId) : [];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {relevantMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {/* Show real-time typing in teacher view */}
        {isTeacherView && currentTypingMessage && (
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-lg p-3 bg-gray-200 text-gray-600 italic">
              Typing: {currentTypingMessage}
            </div>
          </div>
        )}
      </div>

      {!isTeacherView && (
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};