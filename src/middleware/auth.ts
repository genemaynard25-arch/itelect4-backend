import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Express's Request type has no userId field. This block adds one for this
// project only, so req.userId type-checks everywhere.
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// What we put inside the token when we sign it, and get back when we verify.
export interface TokenPayload {
  userId: string;
}

// FROM SESSION 6: ProtectedRoute in the frontend guards the SCREEN. This
// one protects the DATA, and it is the one that matters.
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Sent as:  Authorization: Bearer <token>
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({
      message: "No token. Send Authorization: Bearer <token>",
    });
    return;
  }

  const token = header.slice("Bearer ".length);

  try {
    // verify checks the signature AND the expiry; either failure throws.
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as TokenPayload;
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({
      message: "Token is invalid or has expired",
    });
  }
}
