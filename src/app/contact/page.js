// src/app/contact/page.js

"use client";

import styles from './contact.module.css';

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.headingPrimary}>Contattaci</h1>

            {/* Sezione dati di contatto */}
            <section className={styles.contactInfo}>
                <h2 className={styles.headingSecondary}>Dati di Contatto</h2>
                <p>Telefono: +39 123 456 789</p>
                <p>Email: info@cestlavie.com</p>
                <p>Indirizzo: Via Roma 1, 21100 Varese, Italia</p>
            </section>

            {/* Sezione mappa Google */}
            <section className={styles.mapSection}>
                <h2 className={styles.headingSecondary}>Come Raggiungerci</h2>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.9834084311994!2d8.8418!3d45.8207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47869cba718f6ef5%3A0x5c6e26b96357c74d!2sPasticceria%20C&#39;est%20La%20Vie!5e0!3m2!1sit!2sit!4v1699999999999!5m2!1sit!2sit"
                        width="100%"
                        height="400"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mappa Pasticceria C'est la Vie"
                    ></iframe>
                </div>
            </section>
        </div>
    );
}
