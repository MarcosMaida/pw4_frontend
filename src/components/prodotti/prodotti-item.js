import React, { useState } from "react";
import styles from './prodotti-item.module.css';

export default function ProdottiItem({ prodotto, onQuantityChange }) {
    const [quantity, setQuantity] = useState('');

    const handleQuantityChange = (e) => {
        const newQuantity = String(e.target.value);
        setQuantity(newQuantity);
        onQuantityChange(prodotto.nome, newQuantity);
    };

    return (
        <li className={styles.cardsItem}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img
                        src={prodotto.immagine || "/public/window.svg"}
                        alt={prodotto.nome || "Immagine non disponibile"}
                    />
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{prodotto.nome}</div>
                    <p className={styles.cardText}>{prodotto.descrizione}</p>
                    <span className={styles.category}>Prezzo: €{prodotto.prezzo}</span>
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className={styles.quantityInput}
                        placeholder="Quantità"
                    />
                </div>
            </div>
        </li>
    );
}
