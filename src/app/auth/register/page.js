// src/app/register/page.js

"use client"; // Abilitazione per l'uso degli hook lato client

import { useState } from 'react';
import styles from './register.module.css';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [message, setMessage] = useState('');

    // Gestisce i cambiamenti nei campi di input del form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Gestisce l'invio del form di registrazione
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Le password non corrispondono');
            return;
        }

        // Simulazione di registrazione (potremo sostituire con chiamata API)
        setMessage('Registrazione completata! Ora puoi fare il login.');
        setFormData({ email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Registrazione</h1>
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
                <label className={styles.formLabel}>
                    Conferma Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className={styles.formInput}
                    />
                </label>
                <button type="submit" className={styles.submitButton}>Registrati</button>
            </form>
        </div>
    );
}
