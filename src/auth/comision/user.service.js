import authAheader from "../auth-header";

const API_URL = "https://sepcadbackend.herokuapp.com/api/v1/";

class UserService {
  async getDocentesAuxiliares() {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}docentes/auxiliar`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  }
  async getDocentesAsociados() {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}docentes/asociado`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  }
  async getDocentesPrincipales() {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}docentes/principal`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  }

  async sendEmail(body) {
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return await fetch(`${API_URL}docentes/nomina`, {
      method: "POST",
      headers,
      body,
    }).then((res) => res.json());
  }
}


export default new UserService();