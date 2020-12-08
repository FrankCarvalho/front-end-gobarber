import React from 'react';

import SignIn from './pages/SignIn';
//import SignUp from './pages/SignUp';
import GlobalStayle from './styles/globals';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn/>
    </AppProvider>
           
    <GlobalStayle />
  </>
);

export default App;
