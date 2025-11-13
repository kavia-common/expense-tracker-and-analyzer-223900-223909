import React from 'react';
import Button from '../common/Button';

/**
 * Topbar with page title and theme toggle.
 * Uses documentElement data-theme to toggle between light/dark.
 */
// PUBLIC_INTERFACE
export default function Topbar({ title = 'Expense Tracker', onToggleTheme }) {
  return (
    <header
      className="surface"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        marginBottom: 16,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
      aria-label="Application top bar"
    >
      <h2 style={{ margin: 0 }}>{title}</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={onToggleTheme} ariaLabel="Toggle theme">
          Toggle Theme
        </Button>
      </div>
    </header>
  );
}
