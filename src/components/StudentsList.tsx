import React from 'react';
import { Users, Circle } from 'lucide-react';
import { useSession } from '../context/SessionContext';

export const StudentsList: React.FC = () => {
  const { students, activeStudentId, setActiveStudent } = useSession();

  return (
    <div className="w-64 border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-gray-900">Active Students</h2>
        </div>
      </div>
      
      <div className="overflow-y-auto">
        {students.map((student) => (
          <button
            key={student.id}
            onClick={() => setActiveStudent(student.id)}
            className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 ${
              activeStudentId === student.id ? 'bg-indigo-50' : ''
            }`}
          >
            <Circle
              className={`w-2 h-2 ${
                student.isActive ? 'text-green-500' : 'text-gray-300'
              }`}
              fill="currentColor"
            />
            <div className="text-left">
              <p className="font-medium text-gray-900">{student.name}</p>
              <p className="text-sm text-gray-500">
                {student.currentPrompt ? 'Writing...' : 'Idle'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};