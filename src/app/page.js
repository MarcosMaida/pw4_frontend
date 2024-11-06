// src/app/page.js

"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroSection = document.querySelector(`.${styles.hero}`);
      const background = document.querySelector(`.${styles.background}`);

      if (heroSection && background) {
        const heroHeight = heroSection.offsetHeight;
        if (scrollPosition <= heroHeight) {
          // Applica l'effetto parallax solo all'interno della sezione hero
          background.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        } else {
          // Resetta l'effetto parallax fuori dalla sezione hero
          background.style.transform = 'translateY(0)';
        }
      }
    };

    // Aggiungi l'evento di scorrimento
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <main>
        {/* Hero Section con sfondo parallax e logo */}
        <section className={styles.hero}>
          <div className={styles.background}></div>

          <div className={styles.logoContainer}>
            <Image
              src="/images/logo.webp"
              alt="Logo C'est la Vie"
              width={300}
              height={300}
              className={styles.logo}
            />
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className={styles.callToAction}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaText}>
              <h2>Pasticceria C'est la Vie a Varese</h2>
              <p>
                Mi chiamo Giacomo Aceti e sono il titolare di C’est la Vie. La mia pasticceria nasce nel 2015
                come laboratorio artigianale in via Garibaldi, 5 a Varese e nel 2020 apro un punto vendita
                espositivo per la vendita diretta in Via Carlo Croce, 4.
              </p>
              <p>
                Nel laboratorio produciamo tutti i prodotti messi a disposizione del pubblico nella boutique,
                con una continua ricerca di materie prime di alta qualità e una lavorazione che unisce
                tradizione e innovazione.
              </p>
              <p>
                Il mio è un giovanissimo team che guido con entusiasmo e passione. Una passione che porto
                avanti da 16 anni, iniziata con un percorso nella scuola alberghiera di Stresa e concluso con il
                corso superiore di pasticceria di Alma.
              </p>
              <p>
                C’est la Vie è un luogo capace di sorprendere per l’amore trasmesso attraverso l’arte della
                pasticceria, ma anche per l’accoglienza informale: “Ci piace coinvolgere il cliente e
                trasmettere la nostra passione”.
              </p>
              <button className={styles.ctaButton}>Chiama</button>
            </div>
            <div className={styles.ctaImage}>
              <Image
                src="/images/6.webp"
                alt="Pasticceria C'est la Vie"
                width={400}
                height={400}
              />
            </div>
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
