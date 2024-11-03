import React from 'react';
import { Bot } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const models = [
  { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model, best for complex tasks' },
  { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient for most tasks' },
  { id: 'claude-2', name: 'Claude 2', description: 'Anthropic\'s latest model' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s advanced model' },
];

export const ModelSelector: React.FC = () => {
  const { selectedModel, setSelectedModel } = useChat();

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Bot className="w-5 h-5 text-indigo-600" />
        <h2 className="font-semibold text-gray-900">Select AI Model</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`p-3 rounded-lg text-left transition-colors ${
              selectedModel === model.id
                ? 'bg-indigo-50 border-2 border-indigo-200'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="font-medium text-gray-900">{model.name}</div>
            <div className="text-sm text-gray-500">{model.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};