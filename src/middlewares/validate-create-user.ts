import { Request, Response, NextFunction } from "express";
import { createUserSchema } from "../schemas/user.schemas";
//Executa a validação da requisição usando o schema
export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createUserSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      error: error.errors
    });
  }
};