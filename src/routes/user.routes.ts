//imports
import express from "express";
import { validateemail } from "../middlewares/validateemail";
import userController from "../controllers/user.controller";

//cria o Router
const router = express.Router();

//Rota para Criar
router.post("/users", validateemail, userController.create);
//rota para selecionar todos usuarios
router.get("/users", userController.getAll);
//rota para selecionar por ID
router.get("/users/:id", userController.getUserById);
//rota para update
router.put("/users/:id", validateemail, userController.update);
//exporta
export default router;
