// Para hacer este server he usado lo que explican aqui
// ttps://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
// Me interesaba hacerlo en Typescript
// No obstante, el server que explican en ese tutorial no usa sockets.
// He usado tambien la info que hay aqui:

// https://codingblast.com/chat-application-angular-socket-io/

// para incorporar la comunicación via sockets. Es la que use para el tutorial sobre el
// chat que esta en los videos de las herramientas de classpip


import express from "express";
import http from "http";
import socketIO from "socket.io";
const app = express();
const server = new http.Server(app);
const io = socketIO(server);

const port = 8080;

let dashSocket;

io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("dash", (message) => {
        console.log("Se ha conectado el dashboard");
        dashSocket = socket;
    });
    socket.on("respuestaJuegoDeCuestionario", (alumno) => {
        console.log("Notifica respuesta a juego de cuestionario el alumno " + alumno.id);
        dashSocket.emit ("respuestaJuegoDeCuestionario", alumno);

    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
