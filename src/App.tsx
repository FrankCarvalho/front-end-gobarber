import React from 'react';

import SignIn from './pages/SignIn';
//import SignUp from './pages/SignUp';
import GlobalStayle from './styles/globals';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStayle />
  </>
);

export default App;
