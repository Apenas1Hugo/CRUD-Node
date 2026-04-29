
import { Request, Response, NextFunction } from "express";
import { updateUserSchema } from "../schemas/user.schemas";
//Executa a validação da requisição usando o schema
export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateUserSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({ error: error.errors });
  }
};