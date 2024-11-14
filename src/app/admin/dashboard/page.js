"use client";
import { useState, useEffect } from 'react';
import styles from './adminDashboard.module.css';

export default function AdminDashboardPage() {
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        setShowCards(false);
        const timer = setTimeout(() => setShowCards(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Dashboard Amministratore</h1>
            <p className={styles.description}>
                Benvenuto nella dashboard admin. Qui puoi gestire ordini e inventario.
            </p>
            {showCards && (
                <div className={styles.cardContainer}>
                    <a href="/admin/orders" className={styles.cardLink}>
                        <div className={styles.card}>
                            <img src="/images/ordini.png" alt="Gestione Ordini" className={styles.cardIcon} />
                            <h2 className={styles.cardTitle}>Gestione Ordini</h2>
                            <p>Visualizza e gestisci gli ordini dei clienti.</p>
                        </div>
                    </a>
                    <a href="/admin/inventory" className={styles.cardLink}>
                        <div className={styles.card}>
                            <img src="/images/magazzino.png" alt="Gestione Magazzino" className={styles.cardIcon} />
                            <h2 className={styles.cardTitle}>Gestione Magazzino</h2>
                            <p>Monitora e aggiorna l'inventario dei prodotti.</p>
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
}
