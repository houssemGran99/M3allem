import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { verifyToken } from '../utils/jwt';

export type AuthUser = {
  id: string;
  role: 'client' | 'worker';
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw ApiError.unauthorized('Missing bearer token');
  }
  const token = header.slice('Bearer '.length);
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    throw ApiError.unauthorized('Invalid or expired token');
  }
}

export function requireRole(...roles: Array<AuthUser['role']>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw ApiError.unauthorized();
    }
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden(`This action requires role: ${roles.join(' or ')}`);
    }
    next();
  };
}
