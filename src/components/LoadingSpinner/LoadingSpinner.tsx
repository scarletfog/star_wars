import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingSpinner.css';

const LoadingSpinner = () => {

  return (
    <div className="SpinnerOverlay" data-testid="spinner_overlay">
      <CircularProgress color="secondary" data-testid="spinner" />
    </div>
  );
}

export default LoadingSpinner