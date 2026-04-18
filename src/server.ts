import { app } from "./app";

app.listen({ port: 3001 }).then(() => {
  console.log("Servidor rodando em http://localhost:3001");
});
