"use client";

import React, { useEffect, useState } from 'react';
import styles from './orders.module.css';
import { Button, Modal, Table, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrdersPage() {
    const [ordini, setOrdini] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrdine, setSelectedOrdine] = useState(null);
    const [showConfirmAcceptModal, setShowConfirmAcceptModal] = useState(false);
    const [showConfirmRejectModal, setShowRejectConfirmModal] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    // Search term and pagination states
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ORDERS_PER_PAGE = 5; // Display 5 orders per page

    const fetchOrdini = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/api/ordini', {
                credentials: 'include',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOrdini(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdini();
    }, []);

    // Search handling
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to page 1 when search changes
    };

    const filteredOrdini = ordini.filter((order) =>
        order.prodotti.some(prodotto =>
            prodotto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        ) || order.stato.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAcceptOrdine = async () => {
        setIsAccepting(true);
        try {
            const response = await fetch(`http://localhost:8080/api/ordini/${selectedOrdine}/accept`, {
                credentials: 'include',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setShowConfirmAcceptModal(false);
                await fetchOrdini();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to accept order:", error);
        } finally {
            setIsAccepting(false);
        }
    };

    const handleRejectOrdine = async () => {
        setIsRejecting(true);
        try {
            const response = await fetch(`http://localhost:8080/api/ordini/${selectedOrdine}/cancel`, {
                credentials: 'include',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setShowRejectConfirmModal(false);
                await fetchOrdini();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to reject order:", error);
        } finally {
            setIsRejecting(false);
        }
    };

    const openAcceptConfirmModal = (orderId) => {
        setSelectedOrdine(orderId);
        setShowConfirmAcceptModal(true);
    };

    const openRejectConfirmModal = (orderId) => {
        setSelectedOrdine(orderId);
        setShowRejectConfirmModal(true);
    };

    // Pagination calculations
    const totalOrders = filteredOrdini.length;
    const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const currentOrders = filteredOrdini.slice(startIndex, startIndex + ORDERS_PER_PAGE);

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className={styles.container}>
            <Container>
                <h1 className={styles.heading}>Gestione Ordini</h1>

                {/* Search Bar */}
                <Form.Group controlId="searchBar" className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Cerca ordini per nome prodotto o stato ordine"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form.Group>

                {isLoading ? (
                    <p>Caricamento ordini...</p>
                ) : (
                    <>
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th style={{ width: '25%' }}>Descrizione</th>
                                <th style={{ width: '10%' }}>Stato Ordine</th>
                                <th style={{ width: '15%' }}>Totale</th>
                                <th style={{ width: '10%' }}>Data Ritiro</th>
                                <th style={{ width: '10%' }}>Commento</th>
                                <th style={{ width: '10%' }}>Azioni</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        {Array.isArray(order.prodotti) ? (
                                            order.prodotti.map((prodotto, index) => (
                                                <div key={index}>
                                                    <strong>{prodotto.nome}</strong>: {prodotto.descrizione} - {prodotto.quantita} pcs
                                                </div>
                                            ))
                                        ) : (
                                            <span>{order.prodotti}</span>
                                        )}
                                    </td>
                                    <td>{order.stato}</td>
                                    <td>{order.totale}</td>
                                    <td>{order.dataRitiro}</td>
                                    <td>{order.commento}</td>
                                    <td className="text-center">
                                        <Button variant="success" className="me-2" onClick={() => openAcceptConfirmModal(order.id)}>
                                            Accetta
                                        </Button>
                                        <Button variant="danger" onClick={() => openRejectConfirmModal(order.id)}>
                                            Rifiuta
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                        {/* Pagination Controls */}
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={goToPreviousPage} disabled={currentPage === 1}>
                                Precedente
                            </Button>
                            <span>Pagina {currentPage} di {totalPages}</span>
                            <Button variant="secondary" onClick={goToNextPage} disabled={currentPage === totalPages}>
                                Successiva
                            </Button>
                        </div>
                    </>
                )}

                {/* Modals for Accept/Reject Confirmations */}
                <Modal show={showConfirmAcceptModal} onHide={() => setShowConfirmAcceptModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Conferma Accettazione</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sei sicuro di voler accettare l'ordine?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmAcceptModal(false)}>
                            Annulla
                        </Button>
                        <Button variant="success" onClick={handleAcceptOrdine} disabled={isAccepting}>
                            {isAccepting ? "Conferma in corso" : "Conferma"}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showConfirmRejectModal} onHide={() => setShowRejectConfirmModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Conferma Rifiuto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sei sicuro di voler rifiutare l'ordine?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowRejectConfirmModal(false)}>
                            Annulla
                        </Button>
                        <Button variant="danger" onClick={handleRejectOrdine} disabled={isRejecting}>
                            {isRejecting ? "Conferma in corso" : "Conferma"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}
