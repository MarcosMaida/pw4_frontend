// src/app/dashboard/page.js

"use client"; // Abilitazione del lato client

import { useState } from 'react';
import styles from './dashboard.module.css';

export default function DashboardPage() {
    // Esempio di stato per ordini e commenti
    const [orders, setOrders] = useState([
        { id: 1, name: 'Torta alla crema', status: 'In Preparazione' },
        { id: 2, name: 'Bignè alla cioccolata', status: 'Pronto per il Ritiro' },
    ]);

    const [orderHistory, setOrderHistory] = useState([
        { id: 3, name: 'Millefoglie', status: 'Completato' },
    ]);

    const [comment, setComment] = useState("");

    const handleCommentSubmit = () => {
        alert(`Commento inviato: ${comment}`);
        setComment(""); // Resetta il campo dopo l’invio
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>La Mia Dashboard</h1>

            {/* Sezione Ordini Attuali */}
            <section className={styles.section}>
                <h2>Ordini Attivi</h2>
                <ul className={styles.orderList}>
                    {orders.map((order) => (
                        <li key={order.id} className={styles.orderItem}>
                            {order.name} - <span className={styles.status}>{order.status}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Sezione Storico Ordini */}
            <section className={styles.section}>
                <h2>Storico Ordini</h2>
                <ul className={styles.orderList}>
                    {orderHistory.map((order) => (
                        <li key={order.id} className={styles.orderItem}>
                            {order.name} - <span className={styles.status}>{order.status}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Sezione Commenti */}
            <section className={styles.section}>
                <h2>Lascia un Commento</h2>
                <textarea
                    className={styles.commentBox}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Scrivi un messaggio per il pasticcere..."
                />
                <button className={styles.submitButton} onClick={handleCommentSubmit}>
                    Invia
                </button>
            </section>
        </div>
    );
}
