"use client";

import React, { useEffect, useState } from 'react';
import styles from './inventory.module.css';
import { Button, Modal, Form, Table, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


export default function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProdotto, setNewProdotto] = useState({
        nome: '',
        descrizione: '',
        prezzo: '',
        immagine: '',
        quantita: '',
    });

    // Loading states for different actions
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Stato per la barra di ricerca
    const [searchTerm, setSearchTerm] = useState("");

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


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const filteredProducts = products.filter((product) =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    const handleAddProduct = async () => {
        setIsAdding(true);
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
            setNewProdotto({ nome: '', descrizione: '', prezzo: '', immagine: '', quantita: '' });
        } catch (error) {
            console.error("Failed to add product:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const openUpdateModal = (product) => {
        setSelectedProduct(product);
        setNewProdotto({
            id: product.id,
            nome: product.nome,
            descrizione: product.descrizione,
            prezzo: product.prezzo,
            immagine: product.immagine,
            quantita: product.quantita
        });
        setShowUpdateModal(true);
    };

    const handleUpdateProduct = async () => {
        if (!selectedProduct) return;

        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:8080/api/prodotti/update`, {
                credentials: 'include',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProdotto)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedProdotto = await response.json();
            setProducts(products.map(product =>
                product.id === selectedProduct.id ? updatedProdotto : product
            ));
            setShowUpdateModal(false);
            setSelectedProduct(null);
            setNewProdotto({ nome: '', descrizione: '', prezzo: '', immagine: '', quantita: '' });
        } catch (error) {
            console.error("Failed to update product:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const confirmDeleteProduct = (productId) => {
        setSelectedProduct(productId);
        setShowConfirmModal(true);
    };

    const handleDeleteProduct = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:8080/api/prodotti/${selectedProduct}`, {
                credentials: 'include',
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setProducts(products.filter(product => product.id !== selectedProduct));
                setShowConfirmModal(false);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
        } finally {
            setIsDeleting(false);
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
        <Container>
            <h1 className={styles.container}>Gestione del Magazzino</h1>

            {/* Barra di ricerca */}
            <Form.Group controlId="searchBar" className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Cerca prodotto per nome o ID"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form.Group>

            <div className="text-center mb-4">
                <Button variant="success" onClick={() => {
                    setShowAddModal(true);
                    setNewProdotto({ nome: '', descrizione: '', prezzo: '', quantita: '' });
                }}>
                    Aggiungi Nuovo Prodotto
                </Button>
            </div>

            {isLoading ? (
                <p>Caricamento prodotti...</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>ID</th>
                            <th style={{ width: '20%' }}>Nome</th>
                            <th className="d-none d-md-table-cell">Descrizione</th>
                            <th className="d-none d-md-table-cell">Prezzo</th>
                            <th className="d-none d-md-table-cell">Quantità</th>
                            <th style={{ width: '20%' }}>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.nome}</td>
                                <td className="d-none d-md-table-cell">{product.descrizione}</td>
                                <td className="d-none d-md-table-cell">{product.prezzo}</td>
                                <td className="d-none d-md-table-cell">{product.quantita}</td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            variant="danger"
                                            className="mx-2"
                                            onClick={() => confirmDeleteProduct(product.id)}
                                            disabled={isDeleting}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> {/* Icona Elimina */}
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="mx-2"
                                            onClick={() => openUpdateModal(product)}
                                            disabled={isUpdating}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> {/* Icona Modifica */}
                                        </Button>
                                    </div>
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
                        <Form.Group controlId="formImmagine" className="mt-3">
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control
                                type="text"
                                name="immagine"
                                value={newProdotto.immagine}
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
                    <Button variant="primary" onClick={handleAddProduct} disabled={isAdding}>
                        {isAdding ? "Aggiungendo..." : "Aggiungi Prodotto"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Prodotto</Modal.Title>
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
                        <Form.Group controlId="formImmagine" className="mt-3">
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control
                                type="text"
                                name="immagine"
                                value={newProdotto.immagine}
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
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Annulla
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdateProduct}
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Modificando..." : "Modifica Prodotto"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sei sicuro di voler eliminare il prodotto selezionato?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct} disabled={isDeleting}>
                        {isDeleting ? "Eliminando..." : "Elimina"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
