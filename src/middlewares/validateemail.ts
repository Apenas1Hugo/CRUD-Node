import { Request, Response, NextFunction } from "express";

export const validateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Email inválido" });
    return;
  }

  next();
};