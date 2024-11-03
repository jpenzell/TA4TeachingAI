import React from 'react';
import { useSession } from '../context/SessionContext';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { MessageSquare } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

export const StudentSession: React.FC = () => {
  const { activeStudentId, getStudentById, isTeacherView } = useSession();
  const { user } = useAuth();
  const { currentTypingMessage } = useChat();
  
  // For teacher view, show selected student
  if (isTeacherView) {
    const student = activeStudentId ? getStudentById(activeStudentId) : null;

    if (!student) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Select a student to view their session</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{student.name}</h2>
              <p className="text-sm text-gray-500">Session started {student.sessionStart}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {student.promptCount} prompts today
              </span>
              <MessageSquare className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          {currentTypingMessage && (
            <div className="mt-2 text-sm text-gray-600">
              <span className="animate-pulse">●</span> Student is typing...
            </div>
          )}
        </div>
        <ChatInterface />
      </div>
    );
  }

  // For student view, show current user's session
  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Session</h2>
            <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
          </div>
        </div>
      </div>
      <ChatInterface />
    </div>
  );
};