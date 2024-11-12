import React from 'react';
import styles from './prodotti-grid.module.css';
import ProdottiItem from "@/components/prodotti/prodotti-item";

const ProdottiGrid = ({ prodotti, onQuantityChange }) => {
    return (
        <div className={styles.corsiGrid}>
            {prodotti.map((prodotto, index) => (
                <ProdottiItem key={index} prodotto={prodotto} onQuantityChange={onQuantityChange} />
            ))}
        </div>
    );
};

export default ProdottiGrid;
