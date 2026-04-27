//imports
import express from 'express';
import { validateemail } from "../middlewares/validateemail";
import userController from '../controllers/user.controller';

//cria o Router
const router = express.Router();

//Rota para Criar
router.post('/users', validateemail , userController.create);
//rota para selecionar todos usuarios
router.get('/users', userController.getAll);

//exporta
export default  router;