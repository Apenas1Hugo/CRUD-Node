class UserService {
  createUser({ name, email }: { name: string; email: string }) {
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }

    return {
      id: Date.now(),
      name,
      email
    };
  }
}

export default new UserService();