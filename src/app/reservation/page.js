// src/app/reservation/page.js

"use client";

import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Notification from '../../components/Notification'; // Componente per le notifiche in-app
import styles from './reservation.module.css';

// Componente principale della pagina di prenotazione
export default function ReservationPage() {
    // Stato per il prodotto selezionato, data e orario della prenotazione, e notifica
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reservationDate, setReservationDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const [notification, setNotification] = useState(null);

    // Funzione per gestire l'invio della prenotazione (simulazione)
    const handleReservation = () => {
        // Verifica che tutti i campi siano compilati
        if (!selectedProduct || !reservationDate || !reservationTime) {
            setNotification("Compila tutti i campi per procedere con la prenotazione");
            return;
        }

        // Simula l'invio della prenotazione (mock API)
        sendReservation({
            product: selectedProduct,
            date: reservationDate,
            time: reservationTime,
        });

        // Imposta il messaggio di notifica di conferma
        setNotification(`Prenotazione confermata per ${selectedProduct}!`);

        // Resetta i campi di prenotazione dopo l'invio
        setSelectedProduct(null);
        setReservationDate("");
        setReservationTime("");
    };

    // Funzione mock per simulare l'invio della prenotazione al backend
    const sendReservation = async (reservationData) => {
        try {
            // Sostituire questo URL con l'endpoint reale quando disponibile
            const response = await fetch('/api/mock-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) throw new Error("Errore nell'invio della prenotazione");

            console.log("Prenotazione inviata con successo:", reservationData);
        } catch (error) {
            console.error("Errore:", error);
            setNotification("Errore nell'invio della prenotazione, riprova più tardi.");
        }
    };

    // Funzione per chiudere la notifica
    const handleNotificationClose = () => {
        setNotification(null);
    };

    return (
        <div className={styles.reservationContainer}>
            <div className={styles.content}>
                <h1 className={styles.heading}>Prenotazione Prodotti</h1>

                {/* Mostra la notifica in caso di messaggio */}
                {notification && (
                    <Notification message={notification} onClose={handleNotificationClose} />
                )}

                {/* Sezione Prodotti */}
                <section className={styles.productsSection}>
                    <h2 className={styles.heading}>Seleziona un Prodotto</h2>
                    <div className={styles.productsGrid}>
                        {/* Esempio di card prodotto con callback per la selezione */}
                        <ProductCard name="Torta alla crema" onSelect={() => setSelectedProduct("Torta alla crema")} />
                        <ProductCard name="Bignè alla cioccolata" onSelect={() => setSelectedProduct("Bignè alla cioccolata")} />
                        <ProductCard name="Millefoglie" onSelect={() => setSelectedProduct("Millefoglie")} />
                    </div>
                </section>

                {/* Form di Prenotazione */}
                {selectedProduct && (
                    <section className={styles.reservationForm}>
                        <h2 className={styles.heading}>Prenota il tuo Ritiro</h2>
                        <label className={styles.reservationLabel}>
                            Data:
                            <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
                        </label>
                        <label className={styles.reservationLabel}>
                            Orario:
                            <input type="time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} />
                        </label>
                        <button className={styles.reservationButton} onClick={handleReservation}>
                            Conferma Prenotazione
                        </button>
                    </section>
                )}
            </div>
        </div>
    );
}
