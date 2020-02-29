import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingSpinner.css';

const LoadingSpinner = () => {

  return (
    <div className="SpinnerOverlay">
      <CircularProgress color="secondary" />
    </div>
  );
}

export default LoadingSpinner