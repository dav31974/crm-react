import React, {useState, useContext} from 'react';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';

const LoginPage = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errorMess, setErrorMess] = useState("");

    // Gestion des changements des imputs dans le formulaire
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
            toast.success("Vous êtes désormais connecté 😊")
            // renvoie sur la page customers
            history.replace("/customers");
        } catch (error) {
            setErrorMess("Aucun compte ne possède cette adresse email ou les informations ne correspondent pas ");
            toast.error("Une erreur est survenue");
        }

    };

    return ( 
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>

                <Field label="Adresse email" name="username" value={credentials.username} onChange={handleChange} type="email" errorMess={errorMess}/>

                <Field label="Mot de passe" name="password" value={credentials.password} onChange={handleChange} type="password" errorMess="" />
                
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