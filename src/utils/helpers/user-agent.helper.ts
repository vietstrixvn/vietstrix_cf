export function parseUserAgent(userAgent: string): {
  browser: string;
  os: string;
  display: string;
  isDebugTool: boolean;
} {
  const browser = detectBrowser(userAgent);
  const os = detectOS(userAgent);
  const isDebugTool = DEBUG_TOOLS.some(({ token }) =>
    userAgent.includes(token)
  );

  const display = isDebugTool
    ? `${browser} (Debug)`
    : os !== 'Unknown OS'
      ? `${browser} / ${os}`
      : browser;

  return { browser, os, display, isDebugTool };
}

// --- Helpers ---

const DEBUG_TOOLS = [
  { token: 'PostmanRuntime', name: 'Postman' },
  { token: 'Insomnia', name: 'Insomnia' },
  { token: 'curl', name: 'cURL' },
];

// Thứ tự quan trọng: specific trước, generic sau
const BROWSER_RULES: Array<{ test: (ua: string) => boolean; name: string }> = [
  {
    test: (ua) => DEBUG_TOOLS.some(({ token }) => ua.includes(token)),
    name: '',
  }, // handled separately
  { test: (ua) => ua.includes('OPR') || ua.includes('Opera'), name: 'Opera' }, // trước Chrome
  { test: (ua) => ua.includes('Edg'), name: 'Edge' }, // trước Chrome
  { test: (ua) => ua.includes('Chrome'), name: 'Chrome' },
  { test: (ua) => ua.includes('Firefox'), name: 'Firefox' },
  { test: (ua) => ua.includes('Safari'), name: 'Safari' },
];

function detectBrowser(ua: string): string {
  const debugTool = DEBUG_TOOLS.find(({ token }) => ua.includes(token));
  if (debugTool) return debugTool.name;

  return (
    BROWSER_RULES.slice(1).find(({ test }) => test(ua))?.name ??
    'Unknown Browser'
  );
}

function detectOS(ua: string): string {
  // Android phải check trước Linux vì Android UA chứa cả "Linux"
  if (ua.includes('Android')) {
    const match = ua.match(/Android (\d+)/);
    return match ? `Android ${match[1]}` : 'Android';
  }
  if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iOS'))
    return 'iOS';
  if (ua.includes('Windows NT 10')) return 'Windows 10/11';
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS X')) {
    const match = ua.match(/Mac OS X (\d+[._]\d+)/);
    return match ? `macOS ${match[1].replace('_', '.')}` : 'macOS';
  }
  if (ua.includes('Linux')) return 'Linux';

  return 'Unknown OS';
}
