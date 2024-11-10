// src/app/Header.js

"use client";

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import styles from './Header.module.css';
import Cookies from 'js-cookie';


export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if the cookie exists
        const authToken = Cookies.get('SESSION_COOKIE');
        if (authToken) {
            setIsLoggedIn(true);
            // Fetch the user profile to get the role
            fetch('http://localhost:8080/api/auth/profile', {credentials: 'include'})
                .then(response => response.json())
                .then(userData => {
                    setUserRole(userData.ruolo);
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                Cookies.remove('SESSION_COOKIE');
                setIsLoggedIn(false);
                setUserRole(null);
                window.location.href = '../auth/login';
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleProfileClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/profile', {credentials: 'include'});
            if (response.status === 200) {
                const userData = await response.json();
                if (userData.ruolo === 'amministratore') {
                    window.location.href = 'http://localhost:3000/dashboardAmministratore';
                } else {
                    window.location.href = 'http://localhost:3000/dashboard';
                }
            } else {
                throw new Error('Errore durante il caricamento del profilo');
            }
        } catch (error) {
            console.error('Errore durante il caricamento del profilo:', error);
        }
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/contact" className={styles.link}>Contatti</Link>
                <Link href="/reservation" className={styles.link}>Prenotare</Link>
                <Link href="/auth/register" className={styles.link}>Registrazione</Link>

                {userRole === 'amministratore' && (
                    <>
                        <li>
                            <a href="/" className={styles.link}>Its Incom</a>
                        </li>
                        <li>
                            <a href="/" className={styles.link}>Corsi</a>
                        </li>
                    </>
                )}
                {isLoggedIn ? (
                    <>
                        <li>
                            <button onClick={handleProfileClick}
                                    className={styles.link}>PROFILO
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogout}
                                    className={styles.link}>Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <Link href="/auth/login" className={styles.link}>Login</Link>
                )}
            </nav>
        </header>
    );
}
