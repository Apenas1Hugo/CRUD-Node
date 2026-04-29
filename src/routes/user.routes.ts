//imports
import express from "express";
import userController from "../controllers/user.controller";
import { validateCreateUser } from "../middlewares/validate-create-user";
import { validateUpdateUser } from "../middlewares/validate-update-user";
//cria o Router
const router = express.Router();

//Rota para Criar
router.post("/users", validateCreateUser , userController.create);
//rota para selecionar todos usuarios
router.get("/users", userController.getAll);
//rota para selecionar por ID
router.get("/users/:id", userController.getUserById);
//rota para update
router.put("/users/:id", validateUpdateUser, userController.update);
//rota para delete
router.delete("/users/:id", userController.deleteUser);
//exporta
export default router;
