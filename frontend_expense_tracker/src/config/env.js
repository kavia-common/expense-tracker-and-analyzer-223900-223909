//
// Centralized environment configuration with validation and sensible defaults
//

// PUBLIC_INTERFACE
export function getConfig() {
  /** Provides a frozen configuration object sourced from REACT_APP_* env vars.
   * - Parses and validates known variables with sensible defaults.
   * - Throws descriptive errors for invalid values that would break operation.
   * - Does not require backend URL to run locally.
   *
   * Returned keys:
   *  - apiBase
   *  - backendUrl
   *  - frontendUrl
   *  - wsUrl
   *  - nodeEnv
   *  - telemetryDisabled
   *  - enableSourceMaps
   *  - port
   *  - trustProxy
   *  - logLevel
   *  - healthcheckPath
   *  - featureFlags
   *  - experimentsEnabled
   */
  const {
    REACT_APP_API_BASE,
    REACT_APP_BACKEND_URL,
    REACT_APP_FRONTEND_URL,
    REACT_APP_WS_URL,
    REACT_APP_NODE_ENV,
    REACT_APP_NEXT_TELEMETRY_DISABLED,
    REACT_APP_ENABLE_SOURCE_MAPS,
    REACT_APP_PORT,
    REACT_APP_TRUST_PROXY,
    REACT_APP_LOG_LEVEL,
    REACT_APP_HEALTHCHECK_PATH,
    REACT_APP_FEATURE_FLAGS,
    REACT_APP_EXPERIMENTS_ENABLED,
  } = process.env;

  const nodeEnv = (REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development').toLowerCase();
  const validEnvs = ['development', 'production', 'test'];
  if (!validEnvs.includes(nodeEnv)) {
    throw new Error(`Invalid REACT_APP_NODE_ENV "${nodeEnv}". Expected one of ${validEnvs.join(', ')}`);
  }

  // URL-like fields: allow empty for local dev; if present ensure safe-ish format
  const ensureUrlish = (val, name) => {
    if (!val) return '';
    try {
      // Accept relative or absolute. If absolute, validate using URL
      if (/^https?:\/\//i.test(val)) {
        // eslint-disable-next-line no-new
        new URL(val);
        return val;
      }
      // Relative allowed (e.g., "/api")
      if (val.startsWith('/')) return val;
      // Also allow ws(s) for wsUrl
      if (name === 'REACT_APP_WS_URL' && /^wss?:\/\//i.test(val)) return val;

      throw new Error(`Value must be an absolute URL (http/https${name === 'REACT_APP_WS_URL' ? ' or ws/wss' : ''}) or a relative path starting with "/". Received "${val}"`);
    } catch (e) {
      throw new Error(`Invalid ${name}: ${e.message}`);
    }
  };

  const apiBase = ensureUrlish(REACT_APP_API_BASE || '/api', 'REACT_APP_API_BASE');
  const backendUrl = ensureUrlish(REACT_APP_BACKEND_URL || '', 'REACT_APP_BACKEND_URL');
  const frontendUrl = ensureUrlish(REACT_APP_FRONTEND_URL || '', 'REACT_APP_FRONTEND_URL');
  const wsUrl = ensureUrlish(REACT_APP_WS_URL || '', 'REACT_APP_WS_URL');

  const telemetryDisabled = String(REACT_APP_NEXT_TELEMETRY_DISABLED || '').toLowerCase() === 'true';
  const enableSourceMaps = String(REACT_APP_ENABLE_SOURCE_MAPS || '').toLowerCase() !== 'false'; // default true
  const portRaw = REACT_APP_PORT || '';
  const port = portRaw ? Number(portRaw) : 3000;
  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid REACT_APP_PORT "${REACT_APP_PORT}". Must be a positive number.`);
  }

  const trustProxy = String(REACT_APP_TRUST_PROXY || '').toLowerCase() === 'true';

  const allowedLogLevels = ['silent', 'debug', 'info', 'warn', 'error'];
  const logLevel = (REACT_APP_LOG_LEVEL || 'info').toLowerCase();
  if (!allowedLogLevels.includes(logLevel)) {
    throw new Error(`Invalid REACT_APP_LOG_LEVEL "${REACT_APP_LOG_LEVEL}". Expected one of ${allowedLogLevels.join(', ')}`);
  }

  const healthcheckPath = (REACT_APP_HEALTHCHECK_PATH || '/health').startsWith('/')
    ? (REACT_APP_HEALTHCHECK_PATH || '/health')
    : (() => {
        throw new Error(`Invalid REACT_APP_HEALTHCHECK_PATH "${REACT_APP_HEALTHCHECK_PATH}". Must start with "/".`);
      })();

  let featureFlags = {};
  if (REACT_APP_FEATURE_FLAGS && REACT_APP_FEATURE_FLAGS.trim().length > 0) {
    try {
      const parsed = JSON.parse(REACT_APP_FEATURE_FLAGS);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        featureFlags = parsed;
      } else {
        throw new Error('FEATURE_FLAGS must be a JSON object.');
      }
    } catch (e) {
      throw new Error(`Invalid REACT_APP_FEATURE_FLAGS JSON: ${e.message}`);
    }
  }

  const experimentsEnabled =
    String(REACT_APP_EXPERIMENTS_ENABLED || '').toLowerCase() === 'true';

  const cfg = {
    apiBase,
    backendUrl,
    frontendUrl,
    wsUrl,
    nodeEnv,
    telemetryDisabled,
    enableSourceMaps,
    port,
    trustProxy,
    logLevel,
    healthcheckPath,
    featureFlags,
    experimentsEnabled,
  };

  return Object.freeze(cfg);
}

export default getConfig;
