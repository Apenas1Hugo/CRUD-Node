import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
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
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }
}

export default new UserController();
