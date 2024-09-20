import * as Sentry from '@sentry/node';
import { NodeOptions } from '@sentry/types';

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0, // Adjust this value in production
    environment: process.env.NODE_ENV || 'development',
  });
}

// Middleware for capturing errors in API routes
export function withSentry(handler: any) {
  return async (req: Request, res: Response) => {
    return Sentry.AWSLambda.wrapHandler(handler)(req, res);
  };
}

// Example of capturing an error manually
export function captureException(exception: Error) {
  Sentry.captureException(exception);
}
