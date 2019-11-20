import React from 'react';

const HomePage = (props) => {
    return ( <>
        <div className="jumbotron">
            <h1 className="display-3">Bienvenue</h1>
            <p className="lead">FluidCrm est une application de gestion de clients dévelopée à l'aide de Symfony 4, API Platform et React js</p>
            <hr className="my-4" />
            <p>Créer un compte ou connectez vous avec les identifiants de test: <br/>Adresse email: ericd@gmail.com <br/>Mot de passe: passtest</p>
            <p>Une interface fluide et dynamique vous attends pour la gestion de vos clients :)</p>
        </div> 
        </>
    );
}
 
export default HomePage;