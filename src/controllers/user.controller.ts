//imports
import { Request, Response } from "express";
import userService from "../services/user.service";

//Classe de controle do usuario
class UserController {
  //função que chama a criação do usuario
  async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);

    return res.status(201).json(user);
  }
  //Função que chama o serviço de selecionar todos os usuarios
  async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    return res.json(users);
  }
  //Função que chama a seleção por id
  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const user = await userService.getUserById(id);
    if (!user) {
      throw { code: "NOT_FOUND" };
    }
    return res.json(user);
  }
  //Função que chama o Update
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { name, email } = req.body;

    const user = await userService.updateUser(id, { name, email });

    return res.json(user);
  }
  //Função que chama o Delete
  async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);

    await userService.userDelete(id);

    return res.status(204).send();
  }
}
//exporta
export default new UserController();
