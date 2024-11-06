// src/components/Footer.js

"use client";
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Pasticceria C'est la Vie - Varese</p>
            <p>© {new Date().getFullYear()} Tutti i diritti riservati</p>
        </footer>
    );
}
