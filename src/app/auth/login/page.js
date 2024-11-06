// src/app/auth/login/page.js

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    // Funzione per aggiornare i valori del form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Questi blocchi if simulano il login in assenza del backend:
        // Una volta integrato il backend, sostituiremo questo con una chiamata API
        // Esempio: authUser(formData).then(response => {...})
        if (formData.email === 'admin@admin.it' && formData.password === 'admin123') {
            // Simulazione: salva ruolo come admin
            localStorage.setItem('userRole', 'admin'); // Integrazione Backend: gestito dal server
            sessionStorage.setItem('updateHeader', Date.now().toString()); // Trigger temporaneo per aggiornare l'header
            setMessage('Login come admin avvenuto con successo!');
            router.push('/admin/dashboard'); // Reindirizza alla dashboard admin
        } else if (formData.email && formData.password) {
            // Simulazione: salva ruolo come utente normale
            localStorage.setItem('userRole', 'user'); // Integrazione Backend: gestito dal server
            sessionStorage.setItem('updateHeader', Date.now().toString()); // Trigger temporaneo per aggiornare l'header
            setMessage('Login come utente avvenuto con successo!');
            router.push('/user/dashboard'); // Reindirizza alla dashboard utente
        } else {
            setMessage('Credenziali non valide. Riprova.');
        }

        setFormData({ email: '', password: '' });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Login</h1>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <label className={styles.formLabel}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <button type="submit" className={styles.submitButton}>Accedi</button>
            </form>
        </div>
    );
}
