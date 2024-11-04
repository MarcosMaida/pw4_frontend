// src/app/reservation/page.js

"use client";

import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import styles from './reservation.module.css';

export default function ReservationPage() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reservationDate, setReservationDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");

    const handleReservation = () => {
        alert(`Prenotazione confermata per il prodotto ${selectedProduct}`);
    };

    return (
        <div className={styles.reservationContainer}>
            <div className={styles.content}>
                <h1 className={styles.heading}>Prenotazione Prodotti</h1>

                {/* Sezione Prodotti */}
                <section className={styles.productsSection}>
                    <h2 className={styles.heading}>Seleziona un Prodotto</h2>
                    <div className={styles.productsGrid}>
                        <ProductCard name="Torta alla crema" onSelect={() => setSelectedProduct("Torta alla crema")} />
                        <ProductCard name="Bignè alla cioccolata" onSelect={() => setSelectedProduct("Bignè alla cioccolata")} />
                        <ProductCard name="Millefoglie" onSelect={() => setSelectedProduct("Millefoglie")} />
                    </div>
                </section>

                {/* Form Prenotazione */}
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
                        <button className={styles.reservationButton} onClick={handleReservation}>Conferma Prenotazione</button>
                    </section>
                )}
            </div>
        </div>
    );
}
