// src/app/page.js

"use client";
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function HomePage() {


  return (

    <div className={`${styles.container} ${styles.homePage}`}>
      <main>
        {/* Hero Section with parallax background */}
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

        {/* --- Sezione Orari di apertura, Immagine centrale, e Sedi --- */}
        <section className={styles.layout}>

          {/* Orari di apertura */}
          <div className={styles.openingHours}>
            <h2>Orari di apertura</h2>
            <table className={styles.hoursTable}>
              <tbody>
                <tr>
                  <td><strong>Lunedì</strong></td>
                  <td>Chiuso</td>
                </tr>
                <tr>
                  <td><strong>Mar - Ven</strong></td>
                  <td>08:00 - 13:00 <br /> 14:30 - 19:00</td>
                </tr>
                <tr>
                  <td><strong>Sab - Dom</strong></td>
                  <td>14:30 - 19:00</td>
                </tr>
              </tbody>
            </table>
            {/* Immagine sotto l'orario */}
            <div className={styles.imageDownHours}>
              <Image
                src="/images/5.webp"
                alt="immagine 5"
                width={600}
                height={400}
                className={styles.image2}
              />
            </div>
          </div>

          {/* Immagine centrale */}
          <div className={styles.centerImage}>
            <Image
              src="/images/1.webp"
              alt="Macarons C'est la Vie"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>

          {/* Sedi */}
          <div className={styles.locations}>

            {/* Immagine sopra le sedi */}
            <div className={styles.centerImage}>
              <Image
                src="/images/torta.png"
                alt="torta"
                width={600}
                height={400}
                className={styles.image3}
              />
            </div>

            <h2>Le nostre sedi</h2>
            <p>Laboratorio: Via Garibaldi, 5 - Varese</p>
            <p>Boutique: Via Carlo Croce, 4 - Varese</p>
            <button className={styles.ctaButton}>Scopri di più</button>
            <div className={styles.socialIcons}>
              {/* Icone social media */}
              <a href="https://www.facebook.com/pasticceriacestlavie" target="_blank" rel="noopener noreferrer">
                <img src="/images/social1.webp" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/pasticceriacestlavie/" target="_blank" rel="noopener noreferrer">
                <img src="/images/social2.webp" alt="Instagram" />
              </a>
            </div>
          </div>

        </section>

        {/* Prodotti in evidenza */}
        <section className={styles.featuredProducts}>
          <div className={styles.featuredProductsContent}>
            {/* Bordo superiore */}
            <div className={styles.topBorder}>
              <Image
                src="/images/13.webp"
                alt="bordo1"
                layout="fill"
                className={styles.borderImage}
              />
            </div>

            {/* Immagine centrale con parallax */}
            <div className={styles.backgroundImageContainer}>
              <Image
                src="/images/9.webp"
                alt="immagine centrale"
                layout="fill"
                className={styles.backgroundImage}
              />
            </div>

            {/* Bordo inferiore */}
            <div className={styles.bottomBorder}>
              <Image
                src="/images/12.webp"
                alt="bordo2"
                layout="fill"
                className={styles.borderImage}
              />
            </div>
          </div>

        </section>

        {/* Sezione Informazioni Aggiuntive */}
        <section className={styles.additionalProducts}>

          <div className={styles.productSection}><h2 className={styles.productTitle}>Macarons</h2>
            Macarons = un’esplosione di sapore racchiusa tra due gusci morbidi e un cremoso ripieno. Dolcetti piccoli, rotondi e coloratissimi. Semplicemente deliziosi! Impossibile non innamorarsi a prima vista di questi dolci unici nel loro genere che ti travolgeranno con il loro sapore. Da C’est la Vie abbiamo sempre disponibili una grande varietà di gusti differenti tra cui scegliere. Sono inoltre l’ideale per un regalo elegante e raffinato.</div>

          {/* Sezione Macarons */}
          <div className={styles.productSection}>
            <div className={styles.productText}>
              <p>Confetture e Marmellate
                Nella nostra bellissima Boutique troverete ad aspettarvi anche le buonissime marmellate e confetture homemade.

                Dai gusti audaci, le nostre marmellate sono uniche e irresistibili, ma soprattutto buone!

                Prodotte esclusivamente in modo artigianale e con ingredienti di prima scelta sono ideali per una sana colazione o per una deliziosa merenda.

                Le trovate di vari gusti: arancia rossa e castagna, albicocca e camomilla, fragola e fava tonka, pesca e lavanda, pompelmo e pepe rosa e tanti altri! Le varianti sono molte e cambiano anche in base alla stagionalità!

                Queste deliziose confetture sono anche perfette come cadeau o come bomboniera per il vostro evento!</p>
            </div>
            <Image src="/images/3.webp" alt="Macarons" width={400} height={400} className={styles.productImage} />
          </div>

          {/* Sezione Biscotti */}
          <div className={styles.productSection}>
            <Image src="/images/7.webp" alt="Biscotti" width={400} height={400} className={styles.productImage} />
            <div className={styles.productText}>
              <h2 className={styles.productTitle}>Biscotti</h2>
              <p>Biscotti
                La pasticceria C’est la Vie propone deliziosi biscotti artigianali. I nostri biscotti non sono ovviamente semplici biscotti ma piccoli capolavori di pasticceria pensati per accompagnare con gusto ogni momento della giornata: dalla colazione al tè del pomeriggio, dalla pausa mattutina alla coccola della sera.

                Con gli Incontri potrete assaporare deliziose combinazioni: nocciola e caramello salato, lampone e cioccolato, cioccolato e caffè, pistacchio e limone, cocco e rhum e cocco e frutti esotici.

                Da provare anche i nostri baci di dama, specialità dolciaria della cucina piemontese: due rotonde metà di frolla unite da un velo di cioccolato! E ancora le nostre varianti dei brutti ma buoni.

                Vieni a trovarci per scoprire tutte le nostre proposte!</p>
            </div>
          </div>

        </section>



      </main>
    </div >
  );
}
