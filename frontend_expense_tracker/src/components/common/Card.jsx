import React from 'react';

/**
 * Card component providing a surface container with padding and shadow.
 * Accessible and theme-aware via CSS variables.
 */
// PUBLIC_INTERFACE
export default function Card({ title, children, className = '', headerRight = null }) {
  return (
    <section className={`surface ${className}`} style={{ padding: '16px' }} aria-label={title || 'Card'}>
      {(title || headerRight) && (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          {title ? <h3 style={{ margin: 0 }}>{title}</h3> : <span />}
          {headerRight}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}
