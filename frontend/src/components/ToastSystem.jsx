import React, { useState, useEffect } from 'react';

const ICONS = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
};

function Toast({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    setTimeout(onRemove, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onRemove, 300);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div
      className={`toast-item ${toast.type} ${exiting ? 'exiting' : ''}`}
      onClick={handleClose}
      data-testid={`toast-${toast.type}`}
    >
      <span style={{ fontSize: 16, flexShrink: 0 }}>{ICONS[toast.type]}</span>
      <span>{toast.message}</span>
    </div>
  );
}

export default function ToastSystem({ toasts, removeToast }) {
  return (
    <div className="toast-container" data-testid="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
