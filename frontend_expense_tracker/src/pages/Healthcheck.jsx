import React from 'react';
import getConfig from '../config/env';

/**
 * Healthcheck page that reports a simple OK status and non-sensitive app info.
 */
// PUBLIC_INTERFACE
export default function Healthcheck() {
  const cfg = getConfig();
  const info = {
    status: 'OK',
    version: process.env.REACT_APP_VERSION || '0.1.0',
    nodeEnv: cfg.nodeEnv,
  };

  return (
    <div>
      <h1>Healthcheck</h1>
      <p>OK</p>
      <pre
        aria-label="Health information"
        style={{
          background: 'var(--color-surface)',
          padding: 12,
          borderRadius: 12,
          boxShadow: 'var(--shadow-sm)',
          overflowX: 'auto',
        }}
      >
        {JSON.stringify(info, null, 2)}
      </pre>
    </div>
  );
}
