"use client";
import { useState, useEffect } from 'react';
import styles from './adminDashboard.module.css';
import Cookies from "js-cookie";

export default function AdminDashboardPage() {
    const [showCards, setShowCards] = useState(false);
    const [userName, setUserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        setShowCards(false);
        const timer = setTimeout(() => setShowCards(true), 50);
        return () => clearTimeout(timer);
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


    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Benvenuto {userName}</h1>
            <p className={styles.description}>
                Questa è la tua dashboard admin. Qui puoi gestire ordini e inventario.
            </p>
            {showCards && (
                <div className={styles.cardContainer}>
                    <a href="/admin/inventory" className={styles.cardLink}>
                        <div className={styles.card}>
                            <img src="/images/magazzino.png" alt="Gestione Magazzino" className={styles.cardIcon}/>
                            <h2 className={styles.cardTitle}>Gestione Magazzino</h2>
                            <p>Monitora e aggiorna l'inventario dei prodotti.</p>
                        </div>
                    </a>
                    <a href="/admin/orders" className={styles.cardLink}>
                        <div className={styles.card}>
                            <img src="/images/ordini.png" alt="Gestione Ordini" className={styles.cardIcon}/>
                            <h2 className={styles.cardTitle}>Gestione Ordini</h2>
                            <p>Visualizza e gestisci gli ordini dei clienti.</p>
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
}
