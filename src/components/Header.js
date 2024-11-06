"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
    const [role, setRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);

        const handleStorageChange = () => {
            const updatedRole = localStorage.getItem('userRole');
            setRole(updatedRole);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        setRole(null);
        router.push('/auth/login');
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/contact" className={styles.link}>Contatti</Link>

                {role && (
                    <Link href="/reservation" className={styles.link}>Prenotare</Link>
                )}

                {role === 'admin' ? (
                    <Link href="/admin/dashboard" className={styles.link}>Dashboard Admin</Link>
                ) : role === 'user' ? (
                    <Link href="/user/dashboard" className={styles.link}>Dashboard Utente</Link>
                ) : null}

                {role ? (
                    <Link href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className={styles.link}>
                        Logout
                    </Link>
                ) : (
                    <Link href="/auth/login" className={styles.link}>Login</Link>
                )}

            </nav>
        </header>
    );
}
