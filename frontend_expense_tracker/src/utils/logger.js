import getConfig from '../config/env';

const levels = ['silent', 'debug', 'info', 'warn', 'error'];

/**
 * Simple logger that respects configured log level.
 * Avoids printing potentially sensitive objects by only logging safe messages and whitelisted metadata.
 */
function createLogger() {
  const { logLevel } = getConfig();
  const minIdx = levels.indexOf(logLevel);

  const should = (lvl) => levels.indexOf(lvl) >= minIdx && logLevel !== 'silent';

  const safe = (msg, meta) => {
    // Only include plain objects with primitive fields in meta. Avoid large or sensitive dumps.
    const safeMeta = {};
    if (meta && typeof meta === 'object') {
      Object.entries(meta).forEach(([k, v]) => {
        if (v == null) return;
        const t = typeof v;
        if (t === 'string' || t === 'number' || t === 'boolean') {
          safeMeta[k] = v;
        }
      });
    }
    return [msg, Object.keys(safeMeta).length ? safeMeta : undefined].filter(Boolean);
  };

  return {
    // PUBLIC_INTERFACE
    debug: (msg, meta) => should('debug') && console.debug(...safe(msg, meta)),
    // PUBLIC_INTERFACE
    info: (msg, meta) => should('info') && console.info(...safe(msg, meta)),
    // PUBLIC_INTERFACE
    warn: (msg, meta) => should('warn') && console.warn(...safe(msg, meta)),
    // PUBLIC_INTERFACE
    error: (msg, meta) => should('error') && console.error(...safe(msg, meta)),
  };
}

const logger = createLogger();
export default logger;
