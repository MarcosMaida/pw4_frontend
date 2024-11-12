'use client';

import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import ProdottiGrid from "@/components/prodotti/prodotti-grid";

export default function PrenotazioniPage() {
    const [products, setProducts] = useState([]);
    const [newProdotto, setNewProdotto] = useState({
        nome: '',
        descrizione: '',
        prezzo: '',
        quantita: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProdotto({ ...newProdotto, [name]: value });
    };

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
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setIsLoading(false);
            }
        };
        fetchProdotti();
    }, []);

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();

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

            setNewProdotto({
                nome: '',
                descrizione: '',
                prezzo: '',
                quantita: ''
            });

            setShowAddModal(false); // Close the modal after adding the product
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    return (
        <div >
            <h1>Gestione del Magazzino</h1>

            <ProdottiGrid prodotti={products} />

            {/* Button to open the "Add Product" modal */}
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
                Aggiungi Nuovo Prodotto
            </Button>

            {/* Add Product Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Nuovo Prodotto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddFormSubmit}>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={newProdotto.nome}
                                onChange={handleInputChange}
                                placeholder="Inserisci il nome del prodotto"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescrizione" className="mt-3">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                type="text"
                                name="descrizione"
                                value={newProdotto.descrizione}
                                onChange={handleInputChange}
                                placeholder="Inserisci la descrizione"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrezzo" className="mt-3">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control
                                type="number"
                                name="prezzo"
                                value={newProdotto.prezzo}
                                onChange={handleInputChange}
                                placeholder="Inserisci il prezzo"
                                required
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
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={handleAddFormSubmit}>
                        Aggiungi Prodotto
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
