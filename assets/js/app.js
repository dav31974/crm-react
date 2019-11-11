// Les imports importants
import React, { useState } from 'react';
import ReactDom from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from "./contexts/AuthContext";
import CustomersPage from './pages/CustomersPage';
import HomePage from './pages/HomePage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from "./services/authAPI";
import CustomerPage from './pages/CustomerPage';
import InvoicePage from './pages/InvoicePage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


require('../css/app.css');

AuthAPI.setup();


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());


    // permet d'avoir les memes fonctionalité que les routes sur le composant navbar pour permettre la methode history pour le logout
    const NavbarWithRouter = withRouter(Navbar);


    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter />

                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/customers/:id" component={CustomerPage} />
                        <PrivateRoute path="/customers" component={CustomersPage} /> 
                        <PrivateRoute path="/invoices/:id" component={InvoicePage} />                      
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <Route path="/" component={HomePage} />                        
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App />, rootElement);