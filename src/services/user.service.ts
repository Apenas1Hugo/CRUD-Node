//imports
import prisma from "../database/prisma";
import bcrypt from "bcryptjs";

//Classe de serviço do usuario
class UserService {
  //cria o usuario
  async createUser({ name, email, password }: { name: string; email: string; password: string }) {
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }
  //Função para selecionar todos os usuarios
  async getAllUsers() {
    return await prisma.user.findMany();
  }
  //Função para selecionar por ID
  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
  //Função buscar por email
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  //Função para Atualizar usuario
  async updateUser(
    id: number,
    { name, email, password }: { name: string; email: string; password: string },
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
  //Função para deletar usuario
  async userDelete(id: number) {
    return await prisma.user.delete({ where: { id } });
  }
}

export default new UserService();
