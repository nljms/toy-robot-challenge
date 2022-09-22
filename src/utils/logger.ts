import { Logger } from '../types';

export class ConsoleLogger implements Logger {
  error = (...message: any) => {
    console.error('[ERROR]', ...message);
  };

  info = (...message: any) => {
    console.log('[INFO]', ...message);
  };

  output = (...message: any) => {
    console.log('[OUTPUT]', ...message);
  };
}
