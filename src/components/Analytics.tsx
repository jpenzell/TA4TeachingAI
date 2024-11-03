import React from 'react';
import { BarChart, Clock, Target, Zap } from 'lucide-react';
import { useSession } from '../context/SessionContext';

export const Analytics: React.FC = () => {
  const { activeStudentId, getStudentById } = useSession();
  const student = activeStudentId ? getStudentById(activeStudentId) : null;

  if (!student) return null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Session Analytics</h2>
        <BarChart className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <h3 className="font-medium text-gray-900">Time Metrics</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg. Response Time</span>
              <span className="font-medium">45 seconds</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Session Duration</span>
              <span className="font-medium">24 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-5 h-5 text-indigo-500" />
            <h3 className="font-medium text-gray-900">Prompt Quality</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Clarity Score</span>
              <span className="font-medium">8.5/10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Specificity</span>
              <span className="font-medium">7.2/10</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <h3 className="font-medium text-gray-900">Learning Progress</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Improvement Rate</span>
              <span className="font-medium">+15% this session</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Mastery Level</span>
              <span className="font-medium">Intermediate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};