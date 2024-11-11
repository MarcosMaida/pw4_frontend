// src/components/ProductModal.js

import { useState } from 'react';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose }) {
    const [reservationDate, setReservationDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const [notification, setNotification] = useState("");

    // Gestisci l'invio della prenotazione
    const handleReservation = () => {
        if (!reservationDate || !reservationTime) {
            setNotification("Per favore, seleziona una data e un orario per la prenotazione.");
            return;
        }

        // Simulazione invio prenotazione
        setNotification(`Prenotazione confermata per ${product.name} il ${reservationDate} alle ${reservationTime}.`);

        // Resetta i campi di prenotazione
        setReservationDate("");
        setReservationTime("");
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>Prezzo: €{product.price}</p>

                {/* Form di prenotazione */}
                <div className={styles.reservationForm}>
                    <h3>Prenotazione</h3>
                    <label className={styles.reservationLabel}>
                        Data:
                        <input
                            type="date"
                            value={reservationDate}
                            onChange={(e) => setReservationDate(e.target.value)}
                        />
                    </label>
                    <label className={styles.reservationLabel}>
                        Orario:
                        <input
                            type="time"
                            value={reservationTime}
                            onChange={(e) => setReservationTime(e.target.value)}
                        />
                    </label>
                    <button className={styles.reserveButton} onClick={handleReservation}>
                        Conferma Prenotazione
                    </button>
                </div>

                {/* Mostra la notifica di conferma */}
                {notification && <p className={styles.notification}>{notification}</p>}
            </div>
        </div>
    );
}
