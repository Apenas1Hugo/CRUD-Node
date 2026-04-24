import express from 'express';
import { validateemail } from "../middlewares/validateemail";
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/users', validateemail , userController.create);
router.get('/users', userController.getAll);

export default  router;