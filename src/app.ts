// Para hacer este server he usado lo que explican aqui
// ttps://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
// Me interesaba hacerlo en Typescript
// No obstante, el server que explican en ese tutorial no usa sockets.
// He usado tambien la info que hay aqui:

// https://codingblast.com/chat-application-angular-socket-io/

// para incorporar la comunicación via sockets. Es la que use para el tutorial sobre el
// chat que esta en los videos de las herramientas de classpip

import axios from "axios";
import express from "express";
import http from "http";
import {EnviarEmailService} from "./enviarEmail";
import {PeticionesAPIService} from "./peticionesAPI";

// tslint:disable-next-line:ordered-imports
import socketIO from "socket.io";



// const configMensaje = require('./);
const cors = require('cors');
const bodyParser = require('body-parser');
// const configMensaje = require('./configMensaje');








const app = express();

app.use(bodyParser.json());
app.use(cors());

const server = new http.Server(app);
const io = socketIO(server);
const peticionesAPI = new PeticionesAPIService();
const enviarEmail = new EnviarEmailService();

const port = 8080;

let dashSocket;

let conectados: any [] = [];

// try {
//     axios.get().then ((respuesta) => {
//       console.log (respuesta.data);
//     });
// } catch {
//     console.log ("Error");
// }

const host = "http://147.83.118.92";
const APIUrlProfesores = host + ":3000/api/Profesores";
const APIUrlAlumnos = host + ":3000/api/Alumnos";
const APIUrlGrupos = host + ":3000/api/Grupos";
const APIUrlMatriculas = host + ":3000/api/Matriculas";
const APIUrlEquipos = host + ":3000/api/Equipos";




io.on("connection", (socket) => {
    console.log("user connected");
    console.log("Conectados:  ");
    console.log (conectados);
    socket.on("forceDisconnect", () => {
        socket.disconnect();
    });

    socket.on("dash", (message) => {
        console.log("Se ha conectado el dashboard");
        dashSocket = socket;
    });
    socket.on("usuarioConectado", (conectado) => {
        console.log("Se conecta:  " + conectado.Nombre + " " + conectado.PrimerApellido);
        conectados.push ({id: conectado.id, soc: socket});
        console.log("Conectados:  ");
        console.log (conectados);
    });
    socket.on("recordarContraseña", (datos) => {
        peticionesAPI.EnviarEmail (datos.email, datos.nombre, datos.contrasena);
    });

    socket.on("respuestaJuegoDeCuestionario", (alumno) => {
        console.log("Notifica respuesta a juego de cuestionario el alumno " + alumno.id);
        dashSocket.emit ("respuestaJuegoDeCuestionario", alumno);

    });

    socket.on("modificacionAvatar", (res) => {
        console.log("Notifica cambio en avatar ", res);
        dashSocket.emit ("modificacionAvatar", res);

    });
    socket.on("notificarVotacion", (res) => {
        console.log("Notifica votacion ");
        dashSocket.emit ("notificarVotacion", res);

    });
    socket.on("notificarVotaciones", (res) => {
        console.log("Notifica votaciones ");
        dashSocket.emit ("notificarVotaciones", res);

    });

    socket.on("nickNameJuegoRapido", (nick) => {
        console.log("Recibo Nick: " + nick);
        dashSocket.emit ("nickNameJuegoRapido", nick);

    });


    socket.on("respuestaEncuestaRapida", (respuesta) => {
        console.log("Respuesta encuesta rapida de: " + respuesta.nick);
        dashSocket.emit ("respuestaEncuestaRapida", respuesta);

    });

    socket.on("respuestaVotacionRapida", (respuesta) => {
        console.log("Respuesta encuesta rapida de: " + respuesta.nick);
        dashSocket.emit ("respuestaVotacionRapida", respuesta);

    });


    socket.on("usuarioDesconectado", (conectado) => {
        console.log("Se desconecta:  " + conectado.Nombre + " " + conectado.PrimerApellido);
        conectados = conectados.filter ((con) => con.id !== conectado.id);

        console.log("Conectados:  ");
        console.log (conectados);
    });
    socket.on("'disconnect'", (res) => {
        console.log("Se desconecta el cliente ");

    });

    // Notificaciones para los alumnos

    // Notificación para un alumno
    socket.on("notificacionIndividual", (info) => {
        console.log("Recibo notificacion para alumno ", info);
        const conectado = conectados.filter ((con) => con.id === info.alumnoId)[0];
        if (conectado !== undefined) {
            console.log ("envio notificación al alumno " + info.alumnoId);
            conectado.soc.emit ("notificacion", info.mensaje);
        }
    });
    // Notificaciones para los alumnos de un equipo
    socket.on("notificacionEquipo", (info) => {
        console.log("Recibo notificacion para equipo ", info);
        peticionesAPI.DameAlumnosEquipo (info.equipoId)
        .then ((res) => {
                const alumnos = res.data;
                console.log ("Alumnos del equipo");
                console.log (alumnos);
                alumnos.forEach((alumno) => {
                    const conectado = conectados.filter ((con) => con.id === alumno.id)[0];
                    if (conectado !== undefined) {
                        console.log ("envio notificación al alumno " + alumno.id);
                        conectado.soc.emit ("notificacion", info.mensaje);
                    }
                });
        }).catch ( (error) => {
            console.log ("error");
            console.log (error);
        });
    });

    // Notificaciones para los alumnos de un grupo
    socket.on("notificacionGrupo", (info) => {
        console.log("Recibo notificacion para el grupo ", info);
        peticionesAPI.DameAlumnosGrupo (info.grupoId)
        .then ((res) => {
                const alumnos = res.data;
                console.log ("Alumnos del grupo");
                console.log (alumnos);
                alumnos.forEach((alumno) => {
                    const conectado = conectados.filter ((con) => con.id === alumno.id)[0];
                    if (conectado !== undefined) {
                        console.log ("envio notificación al alumno " + alumno.id);
                        conectado.soc.emit ("notificacion", info.mensaje);
                    }
                });
        }).catch ( (error) => {
            console.log ("error");
            console.log (error);
        });
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
