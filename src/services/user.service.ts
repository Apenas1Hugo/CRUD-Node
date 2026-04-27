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
}

export default new UserService();
