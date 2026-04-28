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
  //Função que chama a seleção por id
  async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }
  //Função que chama o Update
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const { name, email } = req.body;

      const user = await userService.updateUser(id, { name, email });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }
  //Função que chama o Delete
  async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await userService.userDelete(id);

      return res.status(204).send();
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}
//exporta
export default new UserController();
