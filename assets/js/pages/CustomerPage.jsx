import React, {useState, useEffect} from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import CustomersAPI from "../services/customersAPI";

const CustomerPage = ({ match, history }) => {

        // récupération de l'id dans le cas d'une modification d'un customer
        const { id = "new" } = match.params;


        const [customer, setCustomer] = useState({
            lastName: "",
            firstName: "",
            email: "",
            company: ""
        });

        const [errors, setErrors] = useState({
            lastName: "",
            firstName: "",
            email: "",
            company: ""
        })

        const [editing, setEditing] = useState(false);

        // Récupération du customer en fonction de l'identifiant
        const fetchCustomer = async id => {
            try {
                const { firstName, lastName, email, company } = await CustomersAPI.find(id);
                setCustomer({ firstName, lastName, email, company });
            } catch (error) {
                history.replace('/customers');
            }
            
        }
 
        // Chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
        useEffect(() => {
            if (id !== "new") {
                setEditing(true);
                fetchCustomer(id);
            }
        }, [id]);

        // Gestion des changements des inputs dans le formulaire
        const handleChange = ({currentTarget}) => {
            const { name, value } = currentTarget;
            setCustomer({ ...customer, [name]: value });
        };
 
        // Gestion de la soumission du formulaire
        const handleSubmit = async (event) => {
            event.preventDefault();
            try {

                if(editing) {
                    await CustomersAPI.update(id, customer);
                } else {
                    await CustomersAPI.create(customer);
                    history.replace("/customers");
                }
                setErrors({});
            } catch ({ response }) {
                const { violations } = response.data;
                if (violations) {
                    const apiErrors = {};
                    violations.map(({ propertyPath, message }) => {
                        apiErrors[propertyPath] = message;
                    });
                    setErrors(apiErrors);
                }
            }
        }

    return ( <>
        {!editing && <h1>Création d'un cient</h1> || <h1>Modification du client</h1> }

        <form onSubmit={handleSubmit}>
            <Field
              label="Nom de famille"
              name="lastName"
              placeholder="Nom de famille du client"
              value={customer.lastName}
              onChange={handleChange}
              errorMess={errors.lastName}
            />
            <Field 
              label="Prénom" 
              name="firstName" 
              placeholder="Prénom du client" 
              value={customer.firstName}
              onChange={handleChange}
              errorMess={errors.firstName}
            />
            <Field 
              label="Email" 
              name="email" 
              placeholder="Adresse email du client" 
              type="email" 
              value={customer.email}
              onChange={handleChange}
              errorMess={errors.email}
            />
            <Field 
              label="Entreprise" 
              name="company" 
              placeholder="Entreprise du client" 
              value={customer.company}
              onChange={handleChange}
              errorMess={errors.company}
            />

            <div className="form-group">
                <button type="submit" className="btn btn-success">Enregistrer</button>
                <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
            </div>
        </form>

    </> );
}
 
export default CustomerPage;