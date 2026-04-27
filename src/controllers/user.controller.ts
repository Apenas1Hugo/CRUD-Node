//imports
import { Request, Response } from "express";
import userService from "../services/user.service";

//Classe de controle do usuario
class UserController {
  //função que chama a criação do usuario
  async create(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);

      return res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  //Função que chama o serviço de selecionar todos os usuarios
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }
}
//exporta
export default new UserController();
