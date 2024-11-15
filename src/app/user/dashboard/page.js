'use client';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import styles from './dashboard.module.css';
import {Button, Table} from 'react-bootstrap';
import Cookies from "js-cookie";

export default function UserDashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [ordini, setOrdini] = useState([]);
    const [ordiniStorico, setOrdiniStorico] = useState([]);
    const [scrollY, setScrollY] = useState(0);
    const [userName, setUserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {
        const fetchOrdini = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/ordini', {
                    credentials: 'include',
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const ordiniAttivi = data.filter((order) => order.stato !== 'accettato' && order.stato !== 'rifiutato');
                const ordiniStorico = data.filter((order) => order.stato === 'accettato' || order.stato === 'rifiutato');

                setOrdini(ordiniAttivi);
                setOrdiniStorico(ordiniStorico);
            } catch (error) {
                console.error('Failed to fetch ordini:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrdini();
    }, []);

    useEffect(() => {
        const authToken = Cookies.get('SESSION_COOKIE');
        if (authToken) {
            setIsLoggedIn(true);
            fetch('http://localhost:8080/api/auth/profile', { credentials: 'include' })
                .then(response => response.json())
                .then(userData => {
                    setUserName(userData.nomeUtente);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrollY(scrollPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.sfondo} style={{backgroundPositionY: `${scrollY * 0.5}px`}}>
            <div className={styles.mainContainer} style={{transform: `translateY(${scrollY * 0.1}px)`}}>
                <h1> Benvenuto {userName}</h1>
                <div className={styles.subContainer1}>
                    <div className={styles.box1}>
                        <div className={styles.headerContainer}>
                            <h2>Storico Ordini</h2>
                        </div>
                        <ul className={styles.order_list}>
                            {ordiniStorico.map(order => (
                                <li key={order.id}>Ordine #{order.id} - {order.stato} - {order.totale}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.box2}>
                        <div className={styles.headerContainer}>
                            <h2>Ordini Attivi</h2>
                        </div>
                        <div className={styles.orderItem}>
                            {isLoading ? (
                                <p>Caricamento prodotti...</p>
                            ) : (
                                <Table>
                                    <thead>
                                    <tr>
                                        <th style={{width: '30%'}}>Descrizione</th>
                                        <th style={{width: '30%'}}>Stato Ordine</th>
                                        <th style={{width: '20%'}}>Totale</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {ordini.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                {Array.isArray(order.prodotti) ? (
                                                    order.prodotti.map((prodotto, index) => (
                                                        <div key={index}>
                                                            <strong>{prodotto.nome}</strong>: {prodotto.descrizione} - {prodotto.quantita} pcs
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
