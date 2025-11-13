import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../common/Button';

const navStyle = {
  link: {
    display: 'block',
    padding: '10px 12px',
    borderRadius: '12px',
    color: 'var(--color-text)',
    textDecoration: 'none',
  },
  active: {
    background: 'var(--color-secondary)',
    color: '#fff',
  },
};

/**
 * Sidebar navigation with responsive toggle for small screens.
 */
// PUBLIC_INTERFACE
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) => ({
    ...navStyle.link,
    ...(isActive ? navStyle.active : {}),
  });

  return (
    <aside
      style={{
        width: open ? 240 : 64,
        transition: 'width 0.2s ease',
        background: 'var(--color-surface)',
        boxShadow: 'var(--shadow-md)',
        borderRadius: '0 20px 20px 0',
        padding: 12,
        position: 'relative',
      }}
      aria-label="Sidebar navigation"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div
          aria-hidden="true"
          style={{
            width: 36,
            height: 36,
            borderRadius: '12px',
            background: 'var(--gradient-bg)',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
        <Button ariaLabel="Toggle sidebar" variant="ghost" onClick={() => setOpen((v) => !v)}>
          {open ? '«' : '»'}
        </Button>
      </div>
      <nav style={{ display: 'grid', gap: 6 }}>
        <NavLink to="/" style={linkClass} end>
          Dashboard
        </NavLink>
        <NavLink to="/expenses" style={linkClass}>
          Expenses
        </NavLink>
        <NavLink to="/add-expense" style={linkClass}>
          Add Expense
        </NavLink>
        <NavLink to="/categories" style={linkClass}>
          Categories
        </NavLink>
        <NavLink to="/reports" style={linkClass}>
          Reports
        </NavLink>
        <NavLink to="/settings" style={linkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
