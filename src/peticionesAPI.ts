import axios from "axios";
import http from "http";
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
}

