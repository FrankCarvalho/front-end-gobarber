import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStayle from './styles/globals';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes/>
    </AppProvider>           
    <GlobalStayle />
  </Router>
);

export default App;
