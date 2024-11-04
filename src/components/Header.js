// src/components/Header.js
"use client"
import Link from 'next/link';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">C'est la Vie</Link> {/* Rimosso <a> */}
            </div>
            <nav>
                <Link href="/reservation">Prenotazione</Link> {/* Rimosso <a> */}
                <Link href="/dashboard">Dashboard</Link>     {/* Rimosso <a> */}
                <Link href="/contact">Contatti</Link>         {/* Rimosso <a> */}
            </nav>
        </header>
    );
}
