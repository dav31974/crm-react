import React from 'react';

const HomePage = (props) => {
    return ( <>
        <div className="jumbotron">
            <h1 className="display-3">Bienvenue</h1>
            <p className="lead">FluidCrm est une application de gestion de clients dévelopée à l'aide de Symfony 4, API Platform et React js</p>
            <hr className="my-4" />
            <p>Une interface fluide et dynamique vous attends pour la gestion de vos clients :)</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Découvrir</a>
            </p>
        </div> 
        </>
    );
}
 
export default HomePage;