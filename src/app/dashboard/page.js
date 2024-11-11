// src/app/dashboard/page.js

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
    const router = useRouter();

    useEffect(() => {
        // Recupera il ruolo dell'utente da localStorage per determinare il tipo di dashboard
        const userRole = localStorage.getItem('userRole');

        // Reindirizza alla dashboard corretta in base al ruolo
        if (userRole === 'admin') {
            router.push('/admin/dashboard'); // Reindirizzamento per l'admin
        } else if (userRole === 'user') {
            router.push('/user/dashboard'); // Reindirizzamento per utente normale
        } else {
            // Se l'utente non è loggato o il ruolo non è definito, reindirizza al login
            router.push('/auth/login');
        }
    }, [router]);

    return <p>Reindirizzamento in corso...</p>; // Messaggio temporaneo durante il reindirizzamento
}
