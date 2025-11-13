import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import Topbar from '../components/navigation/Topbar';
import getConfig from '../config/env';
import logger from '../utils/logger';

/**
 * AppLayout defines the application shell:
 * - Sidebar navigation
 * - Topbar with theme toggle
 * - Main content area for routed pages
 */
// PUBLIC_INTERFACE
export default function AppLayout({ children }) {
  const cfg = getConfig();
  const [theme, setTheme] = useState(() => {
    // prefer system theme but allow persisted choice
    const persisted = window.localStorage.getItem('theme');
    if (persisted === 'light' || persisted === 'dark') return persisted;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
    logger.debug('Theme changed', { theme });
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    logger.info('AppLayout mounted', {
      nodeEnv: cfg.nodeEnv,
      features: Object.keys(cfg.featureFlags || {}),
    });
  }, [cfg]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: 16 }}>
        <Topbar onToggleTheme={toggleTheme} />
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
