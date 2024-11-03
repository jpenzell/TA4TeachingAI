import React from 'react';
import { Lightbulb, Target, Zap, MessageSquare } from 'lucide-react';

const tips = [
  {
    icon: <Target className="w-5 h-5 text-indigo-500" />,
    title: 'Be Specific',
    description: 'Clear, specific prompts get better results than vague ones.',
  },
  {
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
    title: 'Use Context',
    description: 'Provide relevant background information for more accurate responses.',
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-indigo-500" />,
    title: 'Iterate',
    description: 'Refine your prompts based on the AI\'s responses.',
  },
];

export const TipsPanel: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-900">Pro Tips</h2>
      </div>
      
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              {tip.icon}
              <h3 className="font-medium text-gray-900">{tip.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}