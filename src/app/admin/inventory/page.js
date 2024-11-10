// pages/InventoryPage.js
"use client";

import { useEffect, useState } from 'react';
import styles from './inventory.module.css';
import ProdottiGrid from "@/components/corsi/prodotti-grid";
import Modal from "@/components/modal/modal";

export default function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [newProdotto, setNewProdotto] = useState({
        nome: '',
        descrizione: '',
        prezzo: '',
        quantita: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProdotto({ ...newProdotto, [name]: value });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
            setNewProdotto({ nome: '', descrizione: '', prezzo: '', quantita: '' });
            closeModal();  // Close modal on successful submission
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Gestione del Magazzino</h1>

            <ProdottiGrid prodotti={products} />

            <button onClick={openModal} className={styles.addButton}>
                Aggiungi Nuovo Prodotto
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleAddFormSubmit} className={styles.form}>
                    <h2>Aggiungi Nuovo Prodotto</h2>
                    <label className={styles.formLabel}>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={newProdotto.nome}
                            onChange={handleInputChange}
                            required
                            className={styles.formInput}
                        />
                    </label>
                    <label className={styles.formLabel}>
                        Descrizione:
                        <input
                            type="text"
                            name="descrizione"
                            value={newProdotto.descrizione}
                            onChange={handleInputChange}
                            required
                            className={styles.formInput}
                        />
                    </label>
                    <label className={styles.formLabel}>
                        Prezzo:
                        <input
                            type="number"
                            name="prezzo"
                            value={newProdotto.prezzo}
                            onChange={handleInputChange}
                            required
                            className={styles.formInput}
                        />
                    </label>
                    <label className={styles.formLabel}>
                        Quantità:
                        <input
                            type="number"
                            name="quantita"
                            value={newProdotto.quantita}
                            onChange={handleInputChange}
                            required
                            className={styles.formInput}
                        />
                    </label>
                    <button type="submit" className={styles.submitButton}>
                        Aggiungi Prodotto
                    </button>
                </form>
            </Modal>
        </div>
    );
}
