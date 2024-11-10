import React from 'react';
import styles from './prodotti-grid.module.css';
import ProdottiItem from "@/components/corsi/prodotti-item";

const ProdottiGrid = ({ prodotti }) => {
    return (
        <div className={styles.corsiGrid}>
            {prodotti.map((prodotto, index) => (
                <ProdottiItem key={index} prodotto={prodotto} />
            ))}
        </div>
    );
};

export default ProdottiGrid;
