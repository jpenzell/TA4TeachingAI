import React from 'react';
import { Layout } from './components/Layout';
import { ChatProvider } from './context/ChatContext';
import { SessionProvider } from './context/SessionContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <ChatProvider>
          <Layout />
        </ChatProvider>
      </SessionProvider>
    </AuthProvider>
  );
}

export default App;