// src/app/admin/orders/page.js

"use client";

import { useState } from 'react';
import styles from './orders.module.css';

export default function OrdersPage() {
    // Questo sarà sostituito per prelevare i dati dinamicamente dal backend.
    const [orders, setOrders] = useState([
        {
            id: 1,
            customer: 'Mario Rossi',
            products: ['Torta alla crema', 'Bignè alla cioccolata'],
            pickupDate: '2024-11-10',
            status: 'In attesa',
        },
        {
            id: 2,
            customer: 'Luca Bianchi',
            products: ['Millefoglie'],
            pickupDate: '2024-11-11',
            status: 'In attesa',
        },
    ]);

    // Funzione per accettare un ordine
    const handleAccept = (id) => {
        // Aggiorna localmente lo stato dell'ordine come "Accettato"
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, status: 'Accettato' } : order
            )
        );
        // Questo dovrà poi essere modificato per aggiungere il backend:
        // da fare la chiamata API per aggiornare lo stato dell'ordine nel database
        // esempio: updateOrderStatus(id, 'Accettato').then(() => {...});
    };

    // Funzione per rifiutare un ordine
    const handleReject = (id) => {
        // Aggiorna localmente lo stato dell'ordine come "Rifiutato"
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, status: 'Rifiutato' } : order
            )
        );
        // Questo dovrà poi essere modificato per aggiungere il backend:
        // da fare la chiamata API per aggiornare lo stato dell'ordine nel database
        // esempio: updateOrderStatus(id, 'Rifiutato').then(() => {...});
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Gestione Ordini</h1>

            <ul className={styles.orderList}>
                {orders.map((order) => (
                    <li key={order.id} className={styles.orderItem}>
                        <h3>Cliente: {order.customer}</h3>
                        <p>Prodotti: {order.products.join(', ')}</p>
                        <p>Data di Ritiro: {order.pickupDate}</p>
                        <p className={styles.status}>Stato: {order.status}</p>
                        <div className={styles.actions}>
                            <button
                                className={styles.acceptButton}
                                onClick={() => handleAccept(order.id)}
                                disabled={order.status !== 'In attesa'}
                            >
                                Accetta
                            </button>
                            <button
                                className={styles.rejectButton}
                                onClick={() => handleReject(order.id)}
                                disabled={order.status !== 'In attesa'}
                            >
                                Rifiuta
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
