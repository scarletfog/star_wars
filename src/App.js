import React from 'react';
import { Suspense } from 'react';
import { NetworkErrorBoundary } from 'rest-hooks';
import { CircularProgress as Spinner } from '@material-ui/core';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer.tsx';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <NetworkErrorBoundary>
          <MainContainer />
        </ NetworkErrorBoundary>
      </Suspense>
    </div >
  );
}

export default App;
