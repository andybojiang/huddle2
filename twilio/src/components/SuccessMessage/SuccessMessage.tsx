import React from 'react';

export default function SuccessMessage() {
  return (
    <div
      className="messageBox"
      style={{
        backgroundColor: '#707070',
        width: '70px',
        height: '25px',
        position: 'absolute',
        borderRadius: '4px',
        opacity: '0.9',
      }}
    >
      <p className="message" style={{ margin: '6px', color: 'white', fontSize: '10px', textAlign: 'center' }}>
        Link Copied!
      </p>
    </div>
  );
}
