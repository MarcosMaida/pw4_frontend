"use client"
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './page.module.css';
import { useState, useEffect } from 'react';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Benvenuti alla Pasticceria C'est la Vie</h1>
            <p>La nostra tradizione al servizio del vostro palato.</p>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.about}>
          <h2>Chi Siamo</h2>
          <p>
            La Pasticceria C'est la Vie offre una selezione di dolci artigianali realizzati con ingredienti di
            alta qualità. Ogni prodotto è preparato con passione e cura per regalare un'esperienza unica.
          </p>
        </section>

        {/* Featured Products */}
        <section className={styles.featuredProducts}>
          <h2>Prodotti in Evidenza</h2>
          <div className={styles.productsGrid}>
            {/* Inserire qui i componenti ProductCard per ciascun prodotto */}
          </div>
        </section>
      </main>
    </div>
  );
}
