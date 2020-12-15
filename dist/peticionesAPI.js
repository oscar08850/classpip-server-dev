"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const nodemailer = __importStar(require("nodemailer"));
const URL = __importStar(require("./urls"));
class PeticionesAPIService {
    DameAlumnosEquipo(equipoId) {
        return axios_1.default.get(URL.APIUrlEquipos + "/" + equipoId + "/alumnos");
    }
    DameAlumnosGrupo(grupoId) {
        return axios_1.default.get(URL.APIUrlGrupos + "/" + grupoId + "/alumnos");
    }
    EnviarEmail(email, nombre, contrasena) {
        const transporter = nodemailer.createTransport({
            auth: {
                user: "classpip@gmail.com",
                pass: "Classpip@2016" // Cambialo por tu password
            },
            service: "gmail",
        });
        const mailOptions = {
            from: "Classpip",
            to: email,
            subject: "tu contraseña en Classpip",
            html: nombre + ", <br> Tu contraseña en classpip es: " + contrasena,
        };
        // tslint:disable-next-line:only-arrow-functions
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    }
    EnviarEmailRegistroAlumno(profesor, alumno) {
        console.log('voy a enviar emial a ' + alumno.Email);
        const transporter = nodemailer.createTransport({
            auth: {
                user: "classpip@gmail.com",
                pass: "Classpip@2016" // Cambialo por tu password
            },
            service: "gmail",
        });
        const mailOptions = {
            from: "Classpip",
            to: alumno.Email,
            subject: "registro en Classpip",
            html: "Has sido registrado en Classpip por tu profesor: <br>" +
                profesor.Nombre + " " + profesor.PrimerApellido + " " + profesor.SegundoApellido +
                "<br><br> Tus datos son: <br>" +
                "Nombre: " + alumno.Nombre + "<br>" +
                "Primer apellido: " + alumno.PrimerApellido + "<br>" +
                "Segundo apellido: " + alumno.SegundoApellido + "<br>" +
                "Nombre de usuario: " + alumno.Username + "<br>" +
                "Contraseña: " + alumno.Password + "<br>" +
                "Email: " + alumno.Email + "<br><br>" +
                // tslint:disable-next-line:max-line-length
                "En cuanto puedas por favor cambia tu contraseña (también puedes cambiar tu nombre de usuario) <br> <br>" +
                "Bienvenido a Classpip",
        };
        // tslint:disable-next-line:only-arrow-functions
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    }
}
exports.PeticionesAPIService = PeticionesAPIService;
//# sourceMappingURL=peticionesAPI.js.map