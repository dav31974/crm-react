import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesAPI';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

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
    const [loading, setLoading] = useState(true);

    // permet de récupérer les invoice
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
            setLoading(false);
        } catch (error) {
            toast.error("Erreur lors du chargement des factures !")
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
            await InvoicesAPI.delete(id);
            toast.success("La facture a bien été supprimée")
        } catch (error) {
            toast.error("Une erreur est survenue");
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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Liste des factures</h1>
                <Link className="btn btn-primary" to="/invoices/new">Créer Une Facture</Link>
            </div>
            

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
                {!loading && (<tbody>
                    {paginatedInvoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.chrono}</td>
                            <td>
                                <Link to={"/customers/" + invoice.customer.id}>
                                    {invoice.customer.firstName} {invoice.customer.lastName}
                                </Link>
                            </td>
                            <td className="text-center">{formatDate(invoice.sentAt)}</td>
                            <td className="text-center">{invoice.amount.toLocaleString()} &euro;</td>
                            <td className="text-center"><span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span></td>
                            <td>
                                <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary mr-1">Editer</Link>
                                <button onClick={() => handleDelete(invoice.id)} className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody> )}
            </table>
            {loading && <TableLoader />}

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredInvoices.length} />
        </>
     );
}
 
export default InvoicesPage;