//imports
import express from "express";
import router from "./routes/user.routes";
import { errorHandler } from "./middlewares/error-handler";

//inicia o app express
const app = express();

//Lé o body e transorma de json para javascript obj
app.use(express.json());
//Absorve o router
app.use(router);
//middleware de erro global
app.use(errorHandler);

//Liga o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
