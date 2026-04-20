import express from "express";

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Hugo", email: "hugo@example.com" },
  { id: 2, name: "Marianna", email: "marianna@example.com" },
];

// Rota para obter todos os usuários
app.get("/users", (req, res) => {
  res.json(users);
});

// Rota para obter um usuário por ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const user = users.find((u) => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
});

// Rota para criar um novo usuário
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// rota para alterar informaçoes do usuario
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  const { name, email } = req.body;
  user.name = name ?? user.name;
  user.email = email ?? user?.email;

  res.json(user);
});

// rota para deletar usuario
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "usuario não encontrado" });
  }
  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
