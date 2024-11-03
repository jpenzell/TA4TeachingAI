import React from 'react';
import { useChat } from '../context/ChatContext';
import { AlertTriangle, CheckCircle, Info, Brain } from 'lucide-react';

export const FeedbackPanel: React.FC = () => {
  const { messages, getMessageFeedback } = useChat();
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');

  const analyzeFeedback = (message: string) => {
    const feedback = [];
    
    if (message.length < 20) {
      feedback.push({
        type: 'warning',
        icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
        text: 'Consider providing more details in your prompt',
      });
    }
    
    if (!message.includes('?') && message.length > 20) {
      feedback.push({
        type: 'info',
        icon: <Info className="w-4 h-4 text-blue-500" />,
        text: 'Consider forming your input as a clear question',
      });
    }
    
    if (message.includes('context') || message.includes('background')) {
      feedback.push({
        type: 'success',
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        text: 'Good job providing context!',
      });
    }

    const messageFeedback = lastUserMessage ? getMessageFeedback(lastUserMessage.id) : null;
    if (messageFeedback) {
      feedback.push({
        type: 'analysis',
        icon: <Brain className="w-4 h-4 text-indigo-500" />,
        text: `Prompt Quality Metrics:
          Clarity: ${messageFeedback.clarity.toFixed(1)}/10
          Specificity: ${messageFeedback.specificity.toFixed(1)}/10
          Context: ${messageFeedback.context.toFixed(1)}/10`,
      });
    }
    
    return feedback;
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Real-time Feedback</h2>
      
      {lastUserMessage ? (
        <div className="space-y-4">
          {analyzeFeedback(lastUserMessage.content).map((item, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                item.type === 'analysis' ? 'bg-indigo-50' : 'bg-gray-50'
              }`}
            >
              {item.icon}
              <p className="text-sm text-gray-700 whitespace-pre-line">{item.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Start typing to receive real-time feedback on your interaction style.
        </p>
      )}
    </div>
  );
};