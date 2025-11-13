import React from 'react';

/**
 * Accessible input with label, description, and error message.
 */
// PUBLIC_INTERFACE
export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  hint,
  error,
  className = '',
}) {
  const describedByIds = [];
  if (hint) describedByIds.push(`${id}-hint`);
  if (error) describedByIds.push(`${id}-error`);

  return (
    <div className={className} style={{ marginBottom: 12 }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
          {label} {required ? <span aria-hidden="true" style={{ color: 'var(--color-error)' }}>*</span> : null}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedByIds.join(' ') || undefined}
      />
      {hint && (
        <div id={`${id}-hint`} style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
          {hint}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} style={{ fontSize: 12, color: 'var(--color-error)', marginTop: 6 }}>
          {error}
        </div>
      )}
    </div>
  );
}
