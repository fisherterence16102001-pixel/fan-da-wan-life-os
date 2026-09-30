export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export function createLogger(level: LogLevel = 'info') {
  const order: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
  };

  const log = (current: LogLevel, message: string): void => {
    if (order[current] >= order[level]) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${current.toUpperCase()}] ${message}`);
    }
  };

  return {
    debug: (message: string) => log('debug', message),
    info: (message: string) => log('info', message),
    warn: (message: string) => log('warn', message),
    error: (message: string) => log('error', message),
  };
}
