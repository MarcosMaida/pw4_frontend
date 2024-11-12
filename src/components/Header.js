// src/app/Header.js

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import Cookies from 'js-cookie';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Nuovo stato per il menu
    const router = useRouter();

    useEffect(() => {
        const authToken = Cookies.get('SESSION_COOKIE');
        if (authToken) {
            setIsLoggedIn(true);
            fetch('http://localhost:8080/api/auth/profile', { credentials: 'include' })
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

    const handleLinkClick = () => {
        setIsMenuOpen(false); // Chiude il menu quando si clicca su un link
    };

    return (
        <header className={styles.header}>
            <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`}>
                {!isLoggedIn && (
                    <>
                        <Link href="/" className={styles.link} onClick={handleLinkClick}>Home</Link>
                        <Link href="/auth/register" className={styles.link} onClick={handleLinkClick}>Registrazione</Link>
                        <Link href="/auth/login" className={styles.link} onClick={handleLinkClick}>Login</Link>
                    </>
                )}

                {userRole === 'amministratore' && (
                    <>
                        <Link href="../admin/inventory" className={styles.link} onClick={handleLinkClick}>
                            Gestione magazzino
                        </Link>
                        <Link href="../admin/orders" className={styles.link} onClick={handleLinkClick}>
                            Gestione prenotazione
                        </Link>
                    </>
                )}
                {userRole === 'utente' && (
                    <>
                        <Link href="/contact" className={styles.link} onClick={handleLinkClick}>Contatti</Link>
                        <Link href="/user/prenotazioni" className={styles.link} onClick={handleLinkClick}>Prenotare</Link>
                        <a onClick={() => { handleProfileClick(); handleLinkClick(); }} className={styles.link}>Profilo</a>
                    </>
                )}
                {isLoggedIn ? (
                    <a onClick={() => { handleLogout(); handleLinkClick(); }} className={styles.link}>Logout</a>
                ) : (
                    <Link href="/contact" className={styles.link} onClick={handleLinkClick}>Contatti</Link>
                )}
            </nav>
        </header>
    );
}
