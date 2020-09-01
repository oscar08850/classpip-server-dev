"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
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
}
exports.PeticionesAPIService = PeticionesAPIService;
//# sourceMappingURL=peticionesAPI.js.map