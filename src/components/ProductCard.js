// src/components/ProductCard.js

import styles from './ProductCard.module.css';

export default function ProductCard({ product, onClick }) {
    return (
        <div className={styles.card} onClick={onClick}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>€{product.price}</p>
        </div>
    );
}
