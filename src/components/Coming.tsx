import React from 'react';

const PleaseWaitPage = () => {
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif'
  };

  const spinnerStyle = {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  };

  const textStyle = {
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: 'bold'
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={pageStyle}>
        <div style={spinnerStyle}></div>
        <div style={textStyle}>Please wait while the app is launching...</div>
      </div>
    </>
  );
};

export default PleaseWaitPage;