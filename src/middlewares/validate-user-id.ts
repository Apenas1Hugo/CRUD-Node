import { Request, Response, NextFunction } from "express";
import { userIdSchema } from "../schemas/user.schemas";

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = userIdSchema.parse(req.params);

    req.params.id = String(result.id);

    next();
  } catch (error: any) {
    return res.status(400).json({
      error: error.errors
    });
  }
};