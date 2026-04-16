import http from "http";

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Tudo certo campeão!");
    } else if(req.url === "/api"){
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Bem-vindo à API!" }));
    } else {
            res.writeHead(404);
            res.end("Página não encontrada");
        }
    });

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");

});