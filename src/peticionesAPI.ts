import axios from "axios";
import http from "http";
import * as nodemailer from "nodemailer";
import { Observable } from "rxjs";


const host = "http://147.83.118.92";

const APIUrlProfesores = host + ":3000/api/Profesores";
const APIUrlAlumnos = host + ":3000/api/Alumnos";
const APIUrlGrupos = host + ":3000/api/Grupos";
const APIUrlMatriculas = host + ":3000/api/Matriculas";
const APIUrlEquipos = host + ":3000/api/Equipos";

export class PeticionesAPIService {
    public DameAlumnosEquipo(equipoId: number): any {
        return axios.get(APIUrlEquipos + "/" + equipoId + "/alumnos");
    }
    public DameAlumnosGrupo(grupoId: number): any {
        return axios.get(APIUrlGrupos + "/" + grupoId + "/alumnos");
    }

    public EnviarEmail(email: string, nombre: string, contrasena: string) {
        const transporter = nodemailer.createTransport({
            auth: {
                user: 'classpip@gmail.com', // Cambialo por tu email
                pass: 'Classpip@2016' // Cambialo por tu password
            },
            service: "gmail",
        });
        const mailOptions = {
            from: "Classpip",
            to: email, // Cambia esta parte por el destinatario
            subject: "tu contraseña en Classpip",
            text: nombre + ": Tu contraseña en classpip es: " + contrasena,
        };
        // tslint:disable-next-line:only-arrow-functions
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }
}


