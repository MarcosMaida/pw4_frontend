// pages/InventoryPage.js
"use client";

import React, { useEffect, useState } from 'react';
import styles from './inventory.module.css';
import { Button, Modal, Form, Table, Container } from "react-bootstrap";
// Import Bootstrap CSS in your main entry file
import 'bootstrap/dist/css/bootstrap.min.css';



export default function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedProdotto, setSelectedProdotto] = useState(null);
    const [newProdotto, setNewProdotto] = useState({
        nome: '',
        descrizione: '',
        prezzo: '',
        quantita: '',
    });

    useEffect(() => {
        const fetchProdotti = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/prodotti', {
                    credentials: 'include',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProdotti();
    }, []);

    const handleAddProduct = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/prodotti/add', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProdotto)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const addedProdotto = await response.json();
            setProducts([...products, addedProdotto]);
            setShowAddModal(false);
            setNewProdotto({ nome: '', descrizione: '', prezzo: '', quantita: '' });
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const confirmDeleteProduct = (productId) => {
        setSelectedProdotto(productId);
        setShowConfirmModal(true);
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/prodotti/${selectedProdotto}`, {
                credentials: 'include',
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setProducts(products.filter(product => product.id !== selectedProdotto));
                setShowConfirmModal(false);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProdotto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Container className={`container ${styles.container}`}>
            <h1 className={styles.heading}>Gestione del Magazzino</h1>

            {isLoading ? (
                <p>Caricamento prodotti...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrizione</th>
                        <th>Prezzo</th>
                        <th>Quantità</th>
                        <th>Azioni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nome}</td>
                            <td>{product.descrizione}</td>
                            <td>{product.prezzo}</td>
                            <td>{product.quantita}</td>
                            <td>
                                <Button variant="danger" onClick={() => confirmDeleteProduct(product.id)}>
                                    Elimina
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            {/* Add Product Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Prodotto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={newProdotto.nome}
                                onChange={handleInputChange}
                                placeholder="Inserisci il nome del prodotto"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescrizione" className="mt-3">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                type="text"
                                name="descrizione"
                                value={newProdotto.descrizione}
                                onChange={handleInputChange}
                                placeholder="Inserisci la descrizione del prodotto"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrezzo" className="mt-3">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control
                                type="number"
                                name="prezzo"
                                value={newProdotto.prezzo}
                                onChange={handleInputChange}
                                placeholder="Inserisci il prezzo del prodotto"
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantita" className="mt-3">
                            <Form.Label>Quantità</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantita"
                                value={newProdotto.quantita}
                                onChange={handleInputChange}
                                placeholder="Inserisci la quantità"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Aggiungi Prodotto
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirm Delete Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sei sicuro di voler eliminare il prodotto selezionato?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Elimina
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button className={styles.addButton} onClick={() => setShowAddModal(true)}>
                Aggiungi Nuovo Prodotto
            </Button>
        </Container>
    );
}
