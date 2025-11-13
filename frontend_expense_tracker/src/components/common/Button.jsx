import React from 'react';

/**
 * Themed button with variants and accessible attributes.
 * Never logs or handles sensitive data.
 */
// PUBLIC_INTERFACE
export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  ariaLabel,
  className = '',
  disabled = false,
}) {
  const styles = {
    primary: {
      background: 'var(--color-primary)',
      color: '#fff',
    },
    secondary: {
      background: 'var(--color-secondary)',
      color: '#fff',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid rgba(0,0,0,0.12)',
    },
  };

  const style = styles[variant] || styles.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
