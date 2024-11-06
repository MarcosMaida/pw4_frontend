// src/app/user/dashboard/page.js

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function UserDashboardPage() {
    const router = useRouter();
    const [orders, setOrders] = useState([
        // Questi ordini saranno sostituiti da dati dinamici recuperati dal backend
        { id: 1, name: 'Torta alla crema', status: 'In Preparazione' },
        { id: 2, name: 'Bignè alla cioccolata', status: 'Pronto per il Ritiro' },
    ]);
    const [orderHistory, setOrderHistory] = useState([
        { id: 3, name: 'Millefoglie', status: 'Completato' },
    ]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        // Verifica se l'utente è loggato
        const userRole = localStorage.getItem('userRole');
        if (!userRole || userRole !== 'user') {
            router.push('/auth/login'); // Reindirizza al login se l'utente non è loggato o non è un utente normale
        }
    }, [router]);

    const handleCommentSubmit = () => {
        alert(`Commento inviato: ${comment}`);
        setComment(""); // Reset del commento dopo l'invio

        // Questo dovrà poi essere modificato per aggiungere il backend:
        // Integrazione Backend: invia il commento al server per salvarlo
        // esempio: saveComment(comment).then(() => {...});
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Dashboard Utente</h1>

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
