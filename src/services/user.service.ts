import prisma from "../database/prisma";
class UserService {
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
  async getAllUsers() {
    return await prisma.user.findMany();
  }
}

export default new UserService();
