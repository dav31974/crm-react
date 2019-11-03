// Les imports importants
import React from 'react';
import ReactDom from "react-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import { HashRouter, Switch, Route } from "react-router-dom"
import CustomersPage from './pages/CustomersPage';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

console.log('Hello World and Encore! Edit me in assets/js/app.js');

const App = () => {
    return (
        <HashRouter>
            <Navbar />

            <main className="container pt-5">
                <Switch>
                    <Route path="/customers" component={CustomersPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App />, rootElement);