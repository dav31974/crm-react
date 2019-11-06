import React, {useState} from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import axios from "axios";

const CustomerPage = (props) => {

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

        const handleChange = ({currentTarget}) => {
            const { name, value } = currentTarget;
            setCustomer({ ...customer, [name]: value });
        };

        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await axios.post("http://127.0.0.1:8000/api/customers", customer);
                setErrors({});
            } catch (error) {
                if (error.response.data.violations) {
                    const apiErrors = {};
                    error.response.data.violations.map(violation => {
                        apiErrors[violation.propertyPath] = violation.message;
                    });
                    setErrors(apiErrors);

                }
            }
        }

    return ( <>
        <h1>Création d'un cient</h1>

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