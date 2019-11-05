import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {           
            // stocke le token dans le localStorage
            window.localStorage.setItem("authToken", token);
            // Prévient Axios qu'on a un header par defaut sur toutes nos futures requetes http
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        });
}

function setup() {
    // verifie si un tohen existe
    const token = window.localStorage.getItem("authToken");
    // si le token est valide
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()){
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        }
    }
}

export default {
    authenticate,
    logout,
    setup
};