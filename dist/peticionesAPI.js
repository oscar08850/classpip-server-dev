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
const host = "http://147.83.118.92";
const APIUrlProfesores = host + ":3000/api/Profesores";
const APIUrlAlumnos = host + ":3000/api/Alumnos";
const APIUrlGrupos = host + ":3000/api/Grupos";
const APIUrlMatriculas = host + ":3000/api/Matriculas";
const APIUrlEquipos = host + ":3000/api/Equipos";
class PeticionesAPIService {
    DameAlumnosEquipo(equipoId) {
        return axios_1.default.get(APIUrlEquipos + "/" + equipoId + "/alumnos");
    }
    DameAlumnosGrupo(grupoId) {
        return axios_1.default.get(APIUrlGrupos + "/" + grupoId + "/alumnos");
    }
    EnviarEmail(email, nombre, contrasena) {
        const transporter = nodemailer.createTransport({
            auth: {
                user: 'classpip@gmail.com',
                pass: 'Classpip@2016' // Cambialo por tu password
            },
            service: "gmail",
        });
        const mailOptions = {
            from: "Classpip",
            to: email,
            subject: "tu contraseña en Classpip",
            text: nombre + ": Tu contraseña en classpip es: " + contrasena,
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