//imports
import prisma from "../database/prisma";

//Classe de serviço do usuario
class UserService {
  //cria o usuario
  async createUser({ name, email }: { name: string; email: string }) {
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
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
  //Função para Atualizar usuario
  async updateUser(
    id: number,
    { name, email }: { name: string; email: string },
  ) {
    return await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  }
}

export default new UserService();
