import React, { useState } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import usersAPI from '../services/usersAPI';

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // Gestion des changements des imputs dans le formulaire
    const handleChange = async (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setUser({ ...user, [name]: value});
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};

        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme";
            setErrors(apiErrors);            
        }

        try {
            await usersAPI.register(user);

            setErrors({});
            history.replace('/login');
            
        } catch (error) {
            const {violations} = error.response.data;

            if(violations){
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }

    }

    return ( <>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field name="firstName" label="Prénom" placeholder="Votre Prénom" errorMess={errors.firstName} value={user.firstName} onChange={handleChange} />
            <Field name="lastName" label="Nom" placeholder="Votre nom de famille" errorMess={errors.lastName} value={user.lastName} onChange={handleChange} />
            <Field name="email" label="Email" placeholder="Votre adresse email" type="email" errorMess={errors.email} value={user.email} onChange={handleChange} />
            <Field name="password" label="Mot de passe" type="password" placeholder="Votre mot de passe" errorMess={errors.password} value={user.password} onChange={handleChange} />
            <Field name="passwordConfirm" label="Confirmation du mot de passe" type="password" placeholder="Confirmer votre mot de passe" errorMess={errors.confirmPassword} value={user.confirmPassword} onChange={handleChange} />

            <div className="form-group">
                <button type="submit" className="btn btn-success">
                    Confirmation
                </button>
                <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
            </div>
        </form>
    </> );
}
 
export default RegisterPage;