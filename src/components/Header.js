// src/app/Header.js

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    const [userRole, setUserRole] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    {/* PER LE NOTIFICHE */ }
    const fetchUnreadOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/ordini', { credentials: 'include' });
            if (response.ok) {
                const orders = await response.json();
                const newOrders = orders.filter(order => order.stato === 'non_gestito');
                setNotifications(newOrders);
                setUnreadCount(newOrders.length);
            } else {
                throw new Error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    {/* PER LE NOTIFICHE */ }
    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
        setUnreadCount(0);
    };

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

            fetchUnreadOrders();
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

    {/* PER LE NOTIFICHE */ }
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            {/* MENU HAMBURGER */}
            <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Menu principale */}
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
                        <Link href="../admin/inventory" className={styles.link} onClick={handleLinkClick}>Gestione magazzino</Link>
                        <Link href="../admin/orders" className={styles.link} onClick={handleLinkClick}>Gestione prenotazione</Link>
                        <Link href="/admin/dashboard" className={styles.link} onClick={handleLinkClick}>Profilo</Link>
                    </>
                )}
                {userRole === 'utente' && (
                    <>
                        <Link href="/" className={styles.link} onClick={handleLinkClick}>Home</Link>
                        <Link href="/contact" className={styles.link} onClick={handleLinkClick}>Contatti</Link>
                        <Link href="/user/prenotazioni" className={styles.link} onClick={handleLinkClick}>Prenotazione</Link>
                        <Link href="/user/dashboard" className={styles.link} onClick={handleLinkClick}>Profilo</Link>
                    </>
                )}
                {isLoggedIn ? (
                    <a onClick={() => { handleLogout(); handleLinkClick(); }} className={styles.link}>Logout</a>
                ) : (
                    <Link href="/contact" className={styles.link} onClick={handleLinkClick}>Contatti</Link>
                )}
            </nav>

            {/* NOTIFICHE */}
            {isLoggedIn && (
                <div className={styles.notificationIcon} onClick={handleNotificationClick}>
                    <FontAwesomeIcon icon={faBell} />
                    {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
                    {showNotifications && (
                        <div className={styles.notificationDropdown}>
                            {notifications.length > 0 ? (
                                notifications.map(order => (
                                    <div key={order.id} className={styles.notificationItem} onClick={() => router.push('/admin/orders')}>
                                        <p>Nuovo ordine: {order.id}</p>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noNotifications}>No new orders</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
