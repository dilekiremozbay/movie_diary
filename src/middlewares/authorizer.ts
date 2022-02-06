import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export function validateJWTMiddleware(req: Request, res: Response, next: NextFunction) {
  const headerValue = req.headers.authorization;
  const token = headerValue && headerValue.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'No token provided in Authorization header',
    });
  }

  try {
    const decoded = verify(token, jwtSecret);

    req.userId = decoded.sub as string;

    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid token provided.',
    });
  }
}
