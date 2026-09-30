export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export function createLogger(level: LogLevel = 'info') {
  const levels: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

  const log = (current: LogLevel, message: string): void => {
    if (levels[current] >= levels[level]) {
      const stamp = new Date().toISOString();
      // eslint-disable-next-line no-console
      console.log(`[${stamp}] [${current.toUpperCase()}] ${message}`);
    }
  };

  return {
    debug: (message: string) => log('debug', message),
    info: (message: string) => log('info', message),
    warn: (message: string) => log('warn', message),
    error: (message: string) => log('error', message),
  };
}
