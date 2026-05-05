import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token não informado", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError("JWT_SECRET não configurado", 500);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
      id: number;
    };

    (req as any).user = decoded;

    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
};
