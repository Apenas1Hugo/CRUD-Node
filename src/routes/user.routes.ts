//imports
import express from "express";
import userController from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validate-create-user";
import { validateUpdateUser } from "../middlewares/validate-update-user";
import { validateUserId } from "../middlewares/validate-user-id";
//cria o Router
const router = express.Router();

//Rota para Criar
router.post("/users", validateCreateUser, userController.create);
//rota para selecionar todos usuarios
router.get("/users", userController.getAll);
//rota para selecionar por ID
router.get("/users/:id", validateUserId, userController.getUserById);
//rota para update
router.put(
  "/users/:id",
  validateUserId,
  validateUpdateUser,
  userController.update,
);
//rota para delete
router.delete("/users/:id", validateUserId, userController.deleteUser);
//exporta
export default router;
