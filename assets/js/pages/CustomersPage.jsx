import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from '../components/Pagination';

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/customers")
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response));
    }, []);

    const handleDelete = id => {

        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        axios.delete("http://127.0.0.1:8000/api/customers/" + id)
             .then(response => console.log("ok"))
             .catch(error => {
                 setCustomers(originalCustomers);
                 console.log(error.response);
             });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    // reglage du composant Pgination
    const itemsPerPage = 10;
    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage);

    return ( 
        <>
            <h1>Liste des clients</h1>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>
                                <a href="#">{customer.firstName} {customer.firstName}</a>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className="text-center">
                                <span className="badge-pill badge-primary">{customer.invoices.length}</span>
                            </td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()} &euro;</td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(customer.id)}
                                    disabled={customer.invoices.length > 0} 
                                    className="btn btn-sm btn-danger"
                                >
                                    Supprimer
                                </button>
                            </td>
                    </tr>))}
                </tbody>

            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={customers.length} onPageChanged={handlePageChange} />

            

        </>
    );
};
 
export default CustomersPage;