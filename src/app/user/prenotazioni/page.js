'use client';
import {useEffect, useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import ProdottiGrid from "@/components/prodotti/prodotti-grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie";

export default function PrenotazioniPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showOrderSentModal, setShowOrderSentModal] = useState(false);
    const [orderProducts, setOrderProducts] = useState({});
    const [userEmail, setUserEmail] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOrderLoading, setIsOrderLoading] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');

    const handleQuantityChange = (productName, quantity) => {
        setOrderProducts(prev => ({
            ...prev,
            [productName]: quantity
        }));
    };

    useEffect(() => {
        const authToken = Cookies.get('SESSION_COOKIE');
        if (authToken) {
            setIsLoggedIn(true);
            fetch('http://localhost:8080/api/auth/profile', {credentials: 'include'})
                .then(response => response.json())
                .then(userData => {
                    setUserEmail(userData.email);
                    setUserId(userData.id);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, []);

    useEffect(() => {
        const fetchProdotti = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/prodotti', {
                    credentials: 'include',
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
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

    const handleAddOrder = async () => {
        const filteredProducts = products
            .filter(p => orderProducts[p.nome] > 0)
            .map(p => ({
                nome: p.nome,
                quantita: orderProducts[p.nome],
                prezzo: p.prezzo
            }));

        const orderRequest = {
            idUtente: userId,
            email: userEmail,
            prodotti: filteredProducts,
            dataRitiro: `${pickupDate}T${pickupTime}:00`
        };

        setIsOrderLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/ordini', {
                credentials: 'include',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(orderRequest)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setShowAddModal(false);
            setShowOrderSentModal(true);

        } catch (error) {
            console.error("Failed to add order:", error);
            alert("Errore nella creazione dell'ordine");
        } finally {
            setIsOrderLoading(false);
        }
    };

    return (
        <div>
            <h1>Gestione del Magazzino</h1>
            <ProdottiGrid prodotti={products} onQuantityChange={handleQuantityChange} />

            <Button
                variant="primary"
                onClick={() => setShowAddModal(true)}
                disabled={isLoading}
            >
                {isLoading ? "Caricamento..." : "Conferma Ordine"}
            </Button>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Ordine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Sei sicuro di voler creare un ordine con i prodotti selezionati?</p>
                    <Form.Group>
                        <Form.Label>Data di Ritiro</Form.Label>
                        <Form.Control
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ora di Ritiro</Form.Label>
                        <Form.Control
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Annulla
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleAddOrder}
                        disabled={isOrderLoading || !pickupDate || !pickupTime}
                    >
                        {isOrderLoading ? "Invio in corso..." : "Conferma"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showOrderSentModal} onHide={() => setShowOrderSentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ordine Inviato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Il tuo ordine è stato inviato con successo!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowOrderSentModal(false)}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
