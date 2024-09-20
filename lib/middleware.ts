import Cors from 'cors';
import rateLimit from 'express-rate-limit';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Middleware to run before your handler
export async function runMiddleware(req: Request) {
  await new Promise((resolve, reject) => {
    cors(req, {}, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
  
  await new Promise((resolve, reject) => {
    limiter(req, {}, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}
