//imports
import express from "express";
import userController from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validate-create-user";
import { validateUpdateUser } from "../middlewares/validate-update-user";
import { validateUserId } from "../middlewares/validate-user-id";
import { asyncHandler } from "../utils/asyncHandler";
//cria o Router
const router = express.Router();

// Rota para Criar
router.post("/users", validateCreateUser, asyncHandler(userController.create));

// rota para selecionar todos usuarios
router.get("/users", asyncHandler(userController.getAll));

// rota para selecionar por ID
router.get(
  "/users/:id",
  validateUserId,
  asyncHandler(userController.getUserById),
);

// rota para update
router.put(
  "/users/:id",
  validateUserId,
  validateUpdateUser,
  asyncHandler(userController.update),
);

// rota para delete
router.delete(
  "/users/:id",
  validateUserId,
  asyncHandler(userController.deleteUser),
);
//exporta
export default router;
