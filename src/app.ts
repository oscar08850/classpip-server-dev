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
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";



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


let alumnosConectados: any [] = [];

let registroNotificacionesJuegos: any [] = [];
let socketsDashboards: any[] = [];

// try {
//     axios.get().then ((respuesta) => {
//       console.log (respuesta.data);
//     });
// } catch {
//     console.log ("Error");
// }





io.on("connection", (socket) => {
 
    socket.on("forceDisconnect", () => {
        socket.disconnect();
    });

    // Conexion/desconexión Dashboard
    socket.on("conectarDash", (profesorId) => {
        console.log("Se ha conectado el dashboard");
        socketsDashboards.push ({
            s: socket,
            // tslint:disable-next-line:object-literal-sort-keys
            pId: profesorId,
        });
    });
    socket.on("desconectarDash", (profesorId) => {
        console.log("Se ha desconectado un dashboard");
        const s = socketsDashboards.filter ((elem) => elem.pId === profesorId)[0].s;
        s.disconnect();
        socketsDashboards = socketsDashboards.filter ((elem) => elem.s !== s);
    });

    //Conexion/desconexión alumno
    
    socket.on("alumnoConectado", (alumno) => {
        console.log ('se conecta un alumno');
        console.log (alumno);
        alumnosConectados.push ({id: alumno.id, soc: socket});
    });

    socket.on("alumnoDesconectado", (alumno) => {
        alumnosConectados = alumnosConectados.filter ((con) => con.id !== alumno.id);
    });



    // Juegos ràpidos
    socket.on("nickNameJuegoRapido", (datos) => {
       
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit  ("nickNameJuegoRapido", datos.info);
        }
    });


    
    // Cuando en el juego rapido los alumnos reciben notificaciones se llama a esta función para que se registre el alumno
    socket.on("nickNameJuegoRapidoYRegistro", (datos) => {
        // guardo el socket y la clave del juego
        registroNotificacionesJuegos.push ( {soc: socket, c: datos.c});
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit  ("nickNameJuegoRapido", datos.info);
        }
    });


    socket.on("respuestaEncuestaRapida", (datos) => {
    
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit  ("respuestaEncuestaRapida", datos.info);
        }
    });


    socket.on ("desconectarJuegoCogerTurno", (clave) => {
        registroNotificacionesJuegos = registroNotificacionesJuegos.filter ((elem) => elem.clave !== clave);
    });

   
    socket.on("recordarContraseña", (datos) => {
        peticionesAPI.EnviarEmail (datos.email, datos.nombre, datos.contrasena);
    });

    socket.on ("enviarInfoRegistroAlumno", (datos) => {
        console.log ("recibo peticion enviar info alumno ");
        peticionesAPI.EnviarEmailRegistroAlumno (datos.p, datos.a);
    });

    socket.on("respuestaJuegoDeCuestionario", (datos) => {
        console.log ('recibo respuesta juengo cuestionario');
        console.log (datos);
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId);
        console.log ('voy a emitir respuesta');
        console.log (dash);
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.forEach ((elem) => elem.s.emit  ("respuestaJuegoDeCuestionario", datos.info));
        }
    });

    socket.on("modificacionAvatar", (datos) => {
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit  ("modificacionAvatar", datos.info);
        }
    });

    socket.on("notificarVotacion", (datos) => {
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit  ("notificarVotacion", datos.info);
        }
    });
    socket.on("notificarVotaciones", (datos) => {
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit  ("notificarVotaciones", datos.info);
        }
    });




    socket.on("respuestaVotacionRapida", (datos) => {
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit ("respuestaVotacionRapida", datos.info);
        }
    });


    socket.on("respuestaCuestionarioRapido", (datos) => {
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit ("respuestaCuestionarioRapido", datos.info);
        }

    });

    socket.on("turnoElegido", (datos) => {
        const dash = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId)[0];
        if (dash) {
        // tslint:disable-next-line:max-line-length
            dash.s.emit ("turnoElegido", datos.info);
        }

    });



  
    socket.on("'disconnect'", (res) => {
        console.log("Se desconecta el cliente ");

    });

    // Notificaciones para los alumnos


    // Notificación para alumnos de un juego rápido
    socket.on("notificacionTurnoCogido", (info) => {
        console.log("Recibo notificacion de turno cogido ", info.clave);
        console.log (registroNotificacionesJuegos);
        // Saco los elementos de la lista correspondientes a los jugadores conectados a ese juego rápido
        const conectadosJuegoRapido = registroNotificacionesJuegos.filter ((elem) => elem.c === info.clave);
        console.log ('envio notificacion de turno cogido a');
        console.log (conectadosJuegoRapido);
        conectadosJuegoRapido.forEach ((conectado) => {
            conectado.soc.emit ("turnoCogido", info.turno);
        });
    });

    
    // Notificación para alumnos de un juego rápido
    socket.on("notificacionTurnoNuevo", (info) => {
        console.log("Recibo notificacion para juego rapido ", info.clave);
        // Saco los elementos de la lista correspondientes a los jugadores conectados a ese juego rápido
        const conectadosJuegoRapido = registroNotificacionesJuegos.filter ((elem) => elem.c === info.clave);
        conectadosJuegoRapido.forEach ((conectado) => {
            conectado.soc.emit ("turnoNuevo", info.turno);
        });
    });



    // Notificación para un alumno
    socket.on("notificacionIndividual", (info) => {
        console.log("Recibo notificacion para alumno ", info);
        const conectado = alumnosConectados.filter ((con) => con.id === info.alumnoId)[0];
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
                    const conectado = alumnosConectados.filter ((con) => con.id === alumno.id)[0];
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
                    const conectado = alumnosConectados.filter ((con) => con.id === alumno.id)[0];
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

    //Para avanzar pregunta
    socket.on('avanzarPregunta',(info) => {
        console.log("Avanzar pregunta");
        console.log("Recibo notificacion para el grupo ", info);
        peticionesAPI.DameAlumnosGrupo (info.grupoId)
        .then ((res) => {
                const alumnos = res.data;
                console.log ("Alumnos del grupo");
                console.log (alumnos);
                alumnos.forEach((alumno) => {
                    const conectado = alumnosConectados.filter ((con) => con.id === alumno.id)[0];
                    console.log("MIRAMOS LA CONEXIÓN");
                    console.log(conectado);
                    if (conectado !== undefined) {
                        console.log ("envio notificación al alumno " + alumno.id);
                        conectado.soc.emit ("avanzarPregunta"," info.mensaje");
                    }
                });
        }).catch ( (error) => {
            console.log ("error");
            console.log (error);
        });
    });
   
    //Para enviar la respuesta del alumno en Modalidad Kahoot al Dashboard
    socket.on('respuestaAlumnoKahoot',(datos) => {
        console.log("Respuesta pasando por servidor", datos);
        const listaSocket = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId);
        listaSocket.forEach((socket)=>{
            console.log("Envio Respuesta al profesor:", socket.pId);
            console.log("Envio Respuesta al profesor:",datos);
            socket.s.emit("respuestaAlumnoKahoot",datos);
        });
    });

    //Para enviar la conexión del alumno al juego en Modalidad Kahoot al Dashboard
    socket.on('conexionAlumnoKahoot',(datos) => {
        console.log("Conexión de alumno al juego pasando por servidor");
        console.log(datos);
        const listaSocket = socketsDashboards.filter ((elem) => elem.pId === datos.profesorId);
        listaSocket.forEach((socket)=>{
            console.log("Envio Respuesta al profesor:", socket.pId);
            socket.s.emit("conexionAlumnoKahoot", datos.alumnoId);
        });
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
