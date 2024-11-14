'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { Button, Table } from "react-bootstrap";

export default function UserDashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [ordini, setOrdini] = useState([]);
    const [ordiniStorico, setOrdiniStorico] = useState([]);

    useEffect(() => {
        const fetchOrdini = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/ordini', {
                    credentials: 'include',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const ordiniAttivi = data.filter(order => order.stato !== 'accettato' && order.stato !== 'rifiutato');
                const ordiniStorico = data.filter(order => order.stato === 'accettato' || order.stato === 'rifiutato');

                setOrdini(ordiniAttivi);
                setOrdiniStorico(ordiniStorico);
            } catch (error) {
                console.error("Failed to fetch ordini:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrdini();
    }, []);

    return (
        <div className={styles.sfondo}>
            <div className={styles.mainContainer}>
                <h1 className={styles.title}>Ciao Utente</h1>
                <div className={styles.subContainer1}>
                    <div className={styles.box1}>
                        <h2 className={styles.h2}>Cronologia degli Ordini</h2>
                        <ul className={styles.order_list}>
                            {ordiniStorico.map(order => (
                                <li key={order.id}>Ordine #{order.id} - {order.stato} - {order.totale}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.box2}>
                        <div className={styles.orderItem}>
                            {isLoading ? (
                                <p>Caricamento prodotti...</p>
                            ) : (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '30%' }}>Descrizione</th>
                                            <th style={{ width: '30%' }}>Stato Ordine</th>
                                            <th style={{ width: '20%' }}>Totale</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordini.map((order) => (
                                            <tr key={order.id}>
                                                <td>
                                                    {Array.isArray(order.prodotti) ? (
                                                        order.prodotti.map((prodotto, index) => (
                                                            <div key={index} className="d-flex flex-column" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                <strong>{prodotto.nome}</strong>:
                                                                {prodotto.descrizione} - {prodotto.quantita} pcs
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span>{order.prodotti}</span>
                                                    )}
                                                </td>
                                                <td>{order.stato}</td>
                                                <td>{order.totale}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
