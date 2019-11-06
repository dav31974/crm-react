import React, {useState, useContext} from 'react';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';

const LoginPage = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errorMess, setErrorMess] = useState("");

    // Gestion des champs
    const handleChange = async (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({ ...credentials, [name]: value});
    }

    // Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials);
            setErrorMess("");
            setIsAuthenticated(true);
            // renvoie sur la page customers
            history.replace("/customers");
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