"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
const server = new http_1.default.Server(app);
const io = socket_io_1.default(server);
const port = 8080;
// app.get("/", (req, res) => {
//   res.send("The sedulous hyena ate the antelope!");
// });
let dashSocket;
io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("dash", (message) => {
        console.log("Se ha conectado el dashboard");
        dashSocket = socket;
    });
    socket.on("respuestaJuegoDeCuestionario", (alumnoId) => {
        console.log("Notifica respuesta a juego de cuestionario el alumno " + alumnoId);
        dashSocket.emit("respuestaJuegoDeCuestionario", alumnoId);
    });
});
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
// app.listen(port, (err) => {
//   if (err) {
//     return console.error(err);
//   }
//   return console.log(`server is listening on ${port}`);
// });
//# sourceMappingURL=app.js.map