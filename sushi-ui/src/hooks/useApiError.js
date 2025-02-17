import { useState } from 'react';

const useApiError = () => {
  const [error, setError] = useState({ show: false, message: '' });

  const handleError = (error) => {
    console.log("Processing error in useApiError:", error);
    let errorMessage = 'An unexpected error occurred';
    
    try {
      // Handle different error formats
      if (error.detail) {
        errorMessage = error.detail;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error === 'object') {
        errorMessage = JSON.stringify(error);
      }

      console.log("Final error message:", errorMessage);
      setError({ show: true, message: errorMessage });
    } catch (e) {
      console.error("Error processing error message:", e);
      setError({ show: true, message: 'An unexpected error occurred' });
    }
  };

  const clearError = () => {
    setError({ show: false, message: '' });
  };

  return {
    error,
    handleError,
    clearError,
  };
};

export default useApiError; 