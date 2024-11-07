// src/app/contact/page.js

"use client";

import styles from './contact.module.css';
import Image from 'next/image';
import bakeryImage from '/public/images/1.webp'; // Assicurati di avere l'immagine 1.webp nella cartella public/images

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.headingPrimary}>Contattaci</h1>

            {/* Sezione informazioni sulla pasticceria */}
            <section className={styles.aboutSection}>
                <p>
                    La nostra pasticceria artigianale ti aspetta! C'est la Vie è una pasticceria in stile francese
                    con una boutique in via Carlo Croce, 4 a Varese. La nostra pasticceria artigianale offre una vasta gamma
                    di prodotti dolciari, tra cui: macarons, torte tradizionali e moderne, biscotti artigianali,
                    pasticceria mignon, confetture e marmellate. Inoltre, su prenotazione, realizziamo torte personalizzabili
                    per eventi e wedding cake. È possibile recarsi nel laboratorio di Via Garibaldi, 5 sia per gli ordini che per i ritiri.
                </p>
                <p>
                    <strong>Orari del laboratorio:</strong> Martedì - Sabato: 7.30 - 13.00 e 14.30 - 17.00, Domenica: 8.00 - 12.30
                </p>
            </section>

            <div className={styles.contentWrapper}>
                {/* Sezione con immagine e form */}
                <div className={styles.contactSection}>
                    <Image
                        src={bakeryImage}
                        alt="Pasticceria C'est la Vie"
                        className={styles.contactImage}
                    />
                    <section className={styles.contactFormSection}>
                        <h2 className={styles.headingSecondary}>Compila il form per informazioni</h2>
                        <form className={styles.contactForm}>
                            <label>
                                Nome*:
                                <input type="text" name="nome" required />
                            </label>
                            <label>
                                Cognome*:
                                <input type="text" name="cognome" required />
                            </label>
                            <label>
                                E-mail*:
                                <input type="email" name="email" required />
                            </label>
                            <label>
                                Telefono:
                                <input type="tel" name="telefono" />
                            </label>
                            <label>
                                Messaggio*:
                                <textarea name="messaggio" required></textarea>
                            </label>
                            <div className={styles.privacyPolicy}>
                                <label>
                                    <input type="checkbox" required />
                                    <span>Ho letto l’informativa e autorizzo il trattamento dei miei dati personali per le finalità ivi indicate.</span>
                                </label>
                            </div>
                            <button type="submit" className={styles.submitButton}>Invia</button>
                        </form>
                    </section>
                </div>

                {/* Sezione mappa Google */}
                <section className={styles.mapSection}>
                    <h2 className={styles.headingSecondary}>Come Raggiungerci</h2>
                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.9834084311994!2d8.8418!3d45.8207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47869cba718f6ef5%3A0x5c6e26b96357c74d!2sPasticceria%20C&#39;est%20La%20Vie!5e0!3m2!1sit!2sit!4v1699999999999!5m2!1sit!2sit"
                            width="100%"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mappa Pasticceria C'est la Vie"
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
    );
}
