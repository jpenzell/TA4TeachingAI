import React, { useState } from 'react';
import { MessageCircle, Flag, ThumbsUp, ThumbsDown, Zap, Send } from 'lucide-react';
import { useSession } from '../context/SessionContext';

export const TeacherControls: React.FC = () => {
  const { activeStudentId, getStudentById, sendFeedback, getFeedbackForStudent, isTeacherView } = useSession();
  const [message, setMessage] = useState('');
  const student = activeStudentId ? getStudentById(activeStudentId) : null;

  if (!student) return null;

  const feedback = getFeedbackForStudent(student.id);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendFeedback(
        student.id,
        message,
        isTeacherView ? 'teacher' : 'student'
      );
      setMessage('');
    }
  };

  const handleQuickFeedback = (type: 'positive' | 'negative' | 'flag', message: string) => {
    sendFeedback(student.id, message, type);
  };

  const quickTips = [
    'Try being more specific',
    'Consider breaking this down',
    'Good progress!',
    'Remember to provide context',
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isTeacherView ? 'Teacher Controls' : 'Teacher Communication'}
        </h2>
        
        {isTeacherView && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuickFeedback('positive', 'Great prompt! Keep it up!')}
                className="flex-1 flex items-center justify-center space-x-2 p-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Good Prompt</span>
              </button>
              
              <button
                onClick={() => handleQuickFeedback('negative', 'This prompt could use some improvement.')}
                className="flex-1 flex items-center justify-center space-x-2 p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>Needs Work</span>
              </button>
            </div>

            <button
              onClick={() => handleQuickFeedback('flag', 'This has been flagged for review.')}
              className="w-full flex items-center justify-center space-x-2 p-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100"
            >
              <Flag className="w-4 h-4" />
              <span>Flag for Review</span>
            </button>

            <div className="flex flex-wrap gap-2">
              {quickTips.map((tip, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickFeedback('teacher', tip)}
                  className="flex items-center space-x-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm hover:bg-indigo-100"
                >
                  <Zap className="w-3 h-3" />
                  <span>{tip}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {feedback.map((item) => (
            <div
              key={item.id}
              className={`flex ${item.type === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  item.type === 'student'
                    ? 'bg-blue-500 text-white'
                    : item.type === 'positive'
                    ? 'bg-green-50 text-green-700'
                    : item.type === 'negative'
                    ? 'bg-red-50 text-red-700'
                    : item.type === 'flag'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{item.message}</p>
                <p className="text-xs opacity-75 mt-1">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Send message to ${isTeacherView ? 'student' : 'teacher'}...`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};