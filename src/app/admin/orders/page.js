// src/app/admin/orders/page.js
"use client";

import React, { useEffect, useState } from 'react';
import styles from './orders.module.css';
import { Button, Modal, Table, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrdersPage() {
    const [ordini, setOrdini] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrdine, setSelectedOrdine] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchOrdini = async () => {
            try {
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
        fetchOrdini();
    }, []);

    const handleAcceptOrdine = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/ordini/${selectedOrdine}/status`, {
                credentials: 'include',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setOrdini(ordini.filter(order => order.id !== selectedOrdine));
                setShowConfirmModal(false);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to accept order:", error);
        }
    };

    const openConfirmModal = (orderId) => {
        setSelectedOrdine(orderId);
        setShowConfirmModal(true);
    };

    return (
        <Container>
            <h1 className={styles.heading}>Gestione Ordini</h1>

            {isLoading ? (
                <p>Caricamento ordini...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Descrizione</th>
                        <th style={{ width: '10%' }}>Stato Ordine</th>
                        <th style={{ width: '15%' }}>Totale</th>
                        <th style={{ width: '10%' }}>Azioni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordini.map((order) => (
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
                            <td className="text-center">
                                <Button variant="success" className="me-2" onClick={() => openConfirmModal(order.id)}>
                                    Accetta
                                </Button>
                                <Button variant="danger" onClick={() => openConfirmModal(order.id)}>
                                    Rifiuta
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Accettazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sei sicuro di voler accettare l'ordine?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="success" onClick={handleAcceptOrdine}>
                        Conferma
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
