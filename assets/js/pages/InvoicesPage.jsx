import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesAPI';
import moment from 'moment';

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Anulée"
}

const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // permet de récupérer les invoice
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    // au chargeemt du composant, on cherche les customers
    useEffect( () => {
        fetchInvoices()
    }, []);

    // Supression d'une invoice
    const handleDelete = async id => {
        // copie du tableau original des invoices
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await InvoicesAPI.delete(id)
        } catch (error) {
            setInvoices(originalInvoices);
        }
    };

    // Gestion du changement de page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // gestion de la recherche
    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    // filtrage des invoices en fonction de la recherche
    const filteredInvoices = invoices.filter(
        i =>
         i.chrono.toString().includes(search.toString()) || 
         i.customer.firstName.toLowerCase().includes(search.toLowerCase()) || 
         i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
         i.amount.toString().includes(search.toString()) ||
         STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );


    // reglage du nombre d'item par page
    const itemsPerPage = 10;

    // pagination des données
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    const formatDate = (str) =>  moment(str).format('DD/MM/YYYY');

    return ( 
        <>
            <h1>Liste des factures</h1>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>chrono</th>
                        <th>Client</th>
                        <th className="text-center">Date d'envoie</th>
                        <th className="text-center">montant</th>
                        <th className="text-center">statut</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedInvoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.chrono}</td>
                            <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                            <td className="text-center">{formatDate(invoice.sentAt)}</td>
                            <td className="text-center">{invoice.amount.toLocaleString()}</td>
                            <td className="text-center"><span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span></td>
                            <td>
                                <button className="btn btn-sm btn-primary mr-1">Editer</button>
                                <button onClick={() => handleDelete(invoice.id)} className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredInvoices.length} />
        </>
     );
}
 
export default InvoicesPage;