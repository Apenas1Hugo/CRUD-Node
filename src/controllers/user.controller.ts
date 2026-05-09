//imports
import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import userService from "../services/user.service";
import { AppError } from "../errors/AppError";
import { toUserDTO } from "../DTOs/user.dto";
import { string } from "zod";

//Classe de controle do usuario
class UserController {
  //função que chama a criação do usuario
  async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);

    return res.status(201).json(toUserDTO(user));
  }
  //Função que chama o serviço de selecionar todos os usuarios
  async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    return res.json(users.map(toUserDTO));
  }
  //Função que chama a seleção por id
  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const user = await userService.getUserById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return res.json(toUserDTO(user));
  }
  //Função que chama o Update
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { name, email, password } = req.body;

    const user = await userService.updateUser(id, { name, email, password });

    return res.json(toUserDTO(user));
  }
  //Função que chama o Delete
  async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);

    await userService.userDelete(id);

    return res.status(204).send();
  }
  //Função de login
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }
    const senhavalida = await userService.validatePassword(
      password,
      user.password,
    );
    if (!senhavalida) {
      throw new AppError("Senha Errada", 401);
    }
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRES_IN as string; 
    const options: SignOptions = {
      expiresIn: expiresIn as any,
    };

    const token = jwt.sign({ id: user.id }, secret, options); // Gera o token JWT com o ID do usuário e as opções de expiração

    return res.json({ token });
  }
}
//exporta
export default new UserController();
