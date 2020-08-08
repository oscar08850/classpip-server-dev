"use strict";
// Para hacer este server he usado lo que explican aqui
// ttps://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
// Me interesaba hacerlo en Typescript
// No obstante, el server que explican en ese tutorial no usa sockets.
// He usado tambien la info que hay aqui:
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://codingblast.com/chat-application-angular-socket-io/
// para incorporar la comunicación via sockets. Es la que use para el tutorial sobre el
// chat que esta en los videos de las herramientas de classpip
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
const server = new http_1.default.Server(app);
const io = socket_io_1.default(server);
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
        dashSocket.emit("respuestaJuegoDeCuestionario", alumno);
    });
    socket.on("modificacionAvatar", (res) => {
        console.log("Notifica cambio en avatar ", res);
        dashSocket.emit("modificacionAvatar", res);
    });
    socket.on("notificarVotacion", (res) => {
        console.log("Notifica votacion ");
        dashSocket.emit("notificarVotacion", res);
    });
});
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
//# sourceMappingURL=app.js.map