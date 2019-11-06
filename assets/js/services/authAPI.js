import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * Déconnexion (suppression du token du localstorage)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}
/**
 * Requete http d'authentification et stockage du token dans le storage et sur axios
 * @param {object} credentials 
 */
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

/**
 * Mise en place du token lors du chargement de l'application
 * @returns boolean
 */
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

/**
 * Permet de savoir si on est authehtifié ou non
 */
function isAuthenticated() {
    // verifie si un tohen existe
    const token = window.localStorage.getItem("authToken");
    // si le token est valide
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()){
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};