import React from "react";
import Image from 'next/image';
import styles from './prodotti-item.module.css';

export default function ProdottiItem({ prodotto }) {
    console.log(prodotto);
    return (
        <li className={styles.cardsItem}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    {/*<img*/}
                    {/*    src= {corso.immagini}*/}
                    {/*    alt={corso.nome}*/}
                    {/*/>*/}
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{prodotto.nome}</div>
                    <p className={styles.cardText}>{prodotto.descrizione}</p>
                    <span className={styles.category}>{prodotto.prezzo}</span>
                    <span className={styles.quantita}>{prodotto.quantita}</span>
                    {/*<a href={`/corsi/${prodotto.id}`}>*/}
                    {/*    <div className={styles.iscrivitiButton}>Iscriviti</div>*/}
                    {/*</a>*/}
                </div>
            </div>
        </li>
    );
}