import React, {useState} from 'react';
import axios from "axios";

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errorMess, setErrorMess] = useState("");

    const handleChange = async (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({ ...credentials, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const token = await axios
                .post("http://127.0.0.1:8000/api/login_check", credentials)
                .then(response => response.data.token);
            setErrorMess("");

            // stocke le token dans le localStorage
            window.localStorage.setItem("authToken", token);
            // Prévient Axios qu'on a un header par defaut sur toutes nos futures requetes http
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        } catch (error) {
            setErrorMess("Aucun compte ne possède cette adresse email ou les informations ne correspondent pas ");
        }

    };

    return ( 
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                      onChange={handleChange}
                      value={credentials.username}
                      type="email" placeholder="Adresse email de connexion"
                      name="username" 
                      id="username" 
                      className={"form-control" + (errorMess && " is-invalid")}
                    />
                    { errorMess && <p className="invalid-feedback">{errorMess}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                      onChange={handleChange} 
                      value={credentials.password} 
                      type="password" 
                      placeholder="Votre mot de passe" 
                      name="password" 
                      id="password" 
                      className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Connexion
                    </button>
                </div>
            </form>
        </>
     );
}
 
export default LoginPage;