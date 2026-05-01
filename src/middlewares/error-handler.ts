import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //App error
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
  //  Prisma: registro não encontrado
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }
  }
  // Usuario não encontrado manual
  if (error.code === "NOT_FOUND") {
    return res.status(404).json({
      error: "Usuário não encontrado",
    });
  }
  //campo já existente
  if (error.code === "P2002") {
    return res.status(409).json({
      error: "Email já cadastrado",
    });
  }
  // Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: error.issues
    });
  }
  // erro genérico
  return res.status(500).json({
    error: "Erro interno do servidor",
  });
};
