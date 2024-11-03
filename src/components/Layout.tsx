import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSession } from '../context/SessionContext';
import { LoginView } from './LoginView';
import { StudentsList } from './StudentsList';
import { StudentSession } from './StudentSession';
import { TeacherControls } from './TeacherControls';
import { Analytics } from './Analytics';
import { ModelSelector } from './ModelSelector';
import { FeedbackPanel } from './FeedbackPanel';
import { TipsPanel } from './TipsPanel';
import { LogOut } from 'lucide-react';

export const Layout: React.FC = () => {
  const { user, logout: authLogout } = useAuth();
  const { isTeacherView, logout: sessionLogout } = useSession();

  const handleLogout = () => {
    authLogout();
    sessionLogout();
  };

  if (!user) {
    return <LoginView />;
  }

  const LogoutButton = () => (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );

  if (isTeacherView) {
    return (
      <div className="min-h-screen bg-gray-50 flex relative">
        <LogoutButton />
        <StudentsList />
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <StudentSession />
          </div>
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
            <TeacherControls />
            <Analytics />
          </div>
        </div>
      </div>
    );
  }

  // Student View
  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <LogoutButton />
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <ModelSelector />
        <FeedbackPanel />
        <TipsPanel />
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <StudentSession />
        </div>
        <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
          <TeacherControls />
        </div>
      </div>
    </div>
  );
};