import { Request, Response, NextFunction } from "express";

export const validateemail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email inválido" });
  }

  next();
};