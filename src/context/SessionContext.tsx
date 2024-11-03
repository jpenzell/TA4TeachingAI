import React, { createContext, useContext, useState } from 'react';

interface Feedback {
  id: string;
  studentId: string;
  message: string;
  type: 'teacher' | 'student' | 'positive' | 'negative' | 'flag';
  timestamp: Date;
}

interface Student {
  id: string;
  name: string;
  isActive: boolean;
  currentPrompt?: string;
  sessionStart: string;
  promptCount: number;
}

interface SessionContextType {
  isTeacherView: boolean;
  activeStudentId: string | null;
  students: Student[];
  feedback: Feedback[];
  login: (email: string, isTeacher: boolean) => void;
  logout: () => void;
  setActiveStudent: (studentId: string | null) => void;
  getStudentById: (id: string) => Student | null;
  sendFeedback: (studentId: string, message: string, type: 'teacher' | 'student' | 'positive' | 'negative' | 'flag') => void;
  getFeedbackForStudent: (studentId: string) => Feedback[];
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Chen',
    isActive: true,
    sessionStart: '10:30 AM',
    promptCount: 15
  },
  {
    id: '2',
    name: 'Bob Smith',
    isActive: true,
    currentPrompt: 'How do I write better prompts?',
    sessionStart: '10:45 AM',
    promptCount: 8
  },
  {
    id: '3',
    name: 'Carol Johnson',
    isActive: false,
    sessionStart: '11:00 AM',
    promptCount: 12
  }
];

const mockFeedback: Feedback[] = [
  {
    id: '1',
    studentId: '1',
    message: 'Great job on being specific with your prompt!',
    type: 'positive',
    timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: '2',
    studentId: '1',
    message: 'Thank you! I tried to include more context.',
    type: 'student',
    timestamp: new Date(Date.now() - 1000 * 60 * 4) // 4 minutes ago
  },
  {
    id: '3',
    studentId: '1',
    message: 'Try breaking down your question into smaller parts.',
    type: 'teacher',
    timestamp: new Date(Date.now() - 1000 * 60 * 3) // 3 minutes ago
  }
];

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTeacherView, setIsTeacherView] = useState(false);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [students] = useState<Student[]>(mockStudents);
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);

  const login = (email: string, isTeacher: boolean) => {
    setIsTeacherView(isTeacher);
    if (isTeacher) {
      setActiveStudentId('1'); // Default to first student for teacher
    } else {
      const student = students.find(s => s.name === 'Alice Chen');
      setActiveStudentId(student?.id || null);
    }
  };

  const logout = () => {
    setIsTeacherView(false);
    setActiveStudentId(null);
  };

  const setActiveStudent = (studentId: string | null) => {
    setActiveStudentId(studentId);
  };

  const getStudentById = (id: string) => {
    return students.find(student => student.id === id) || null;
  };

  const sendFeedback = (studentId: string, message: string, type: 'teacher' | 'student' | 'positive' | 'negative' | 'flag') => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      studentId,
      message,
      type,
      timestamp: new Date(),
    };
    setFeedback(prev => [...prev, newFeedback]);
  };

  const getFeedbackForStudent = (studentId: string) => {
    return feedback.filter(f => f.studentId === studentId);
  };

  return (
    <SessionContext.Provider 
      value={{ 
        isTeacherView, 
        activeStudentId,
        students,
        feedback,
        login, 
        logout, 
        setActiveStudent,
        getStudentById,
        sendFeedback,
        getFeedbackForStudent
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};