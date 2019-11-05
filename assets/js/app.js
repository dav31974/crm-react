// Les imports importants
import React, {useState} from 'react';
import ReactDom from "react-dom";
import { HashRouter, Route, Switch, withRouter, Redirect } from "react-router-dom";
import Navbar from './components/Navbar';
import CustomersPage from './pages/CustomersPage';
import HomePage from './pages/Homepage';
import InvoicesPage from './pages/invoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from "./services/authAPI";
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

AuthAPI.setup();

const PrivateRoute = ({path, isAuthenticated, component}) => {
    return isAuthenticated ? <Route path={path} component={component} /> : <Redirect to="/login" />
}

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

console.log('Hello World and Encore! Edit me in assets/js/app.js');

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());


    // permet d'avoir les memes fonctionalité que les routes sur le composant navbar pour permettre la methode history pour le logout
    const NavbarWithRouter = withRouter(Navbar);

    return (
        <HashRouter>
            <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />

            <main className="container pt-5">
                <Switch>
                    <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomersPage} />
                    <Route
                        path="/login" 
                        render={props => (
                            <LoginPage
                                onLogin={setIsAuthenticated} {...props}
                            />
                        )}
                     />
                    <PrivateRoute path="/invoices" isAuthenticated={isAuthenticated} component={InvoicesPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App />, rootElement);