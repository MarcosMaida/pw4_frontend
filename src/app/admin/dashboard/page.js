// src/app/admin/dashboard/page.js

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './adminDashboard.module.css';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Recupera il ruolo dell'utente per verificare che sia un admin
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);

        // Se il ruolo non è admin, reindirizza al login
        if (userRole !== 'admin') {
            router.push('/auth/login');
        }
    }, [router]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Dashboard Amministratore</h1>
            <p>Benvenuto nella dashboard admin. Qui puoi gestire ordini e inventario.</p>
            <ul>
                <li><a href="/admin/orders">Gestione Ordini</a></li>
                <li><a href="/admin/inventory">Gestione Magazzino</a></li>
            </ul>
        </div>
    );
}
