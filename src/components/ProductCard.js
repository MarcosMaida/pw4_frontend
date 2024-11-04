// src/components/ProductCard.js

"use client";

import styles from './ProductCard.module.css';

export default function ProductCard({ name, onSelect }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.productTitle}>{name}</h3> {/* Usa la classe productTitle per h3 */}
            <button className={styles.selectButton} onClick={onSelect}>Seleziona</button>
        </div>
    );
}
