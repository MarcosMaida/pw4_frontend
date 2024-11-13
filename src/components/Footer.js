// src/components/Footer.js

"use client";
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.infoContainer}>
                <div className={styles.contact}>
                    <h3>Sede e contatti</h3>
                    <p>Via Carlo Croce, 4 - 21100 Varese (VA)</p>
                    <p>Via Giuseppe Garibaldi, 5 - 21100 Varese (VA)</p>
                    <p>+39 327 7380932</p>
                    <p>pasticceriacestlavie@gmail.com</p>
                </div>

                <div className={styles.hours}>
                    <h3>Orari boutique</h3>
                    <div className={styles.schedule}>
                        <div>
                            <p>Lunedì</p>
                            <p>Mar - Ven</p>
                            <p>Sabato</p>
                            <p>Domenica</p>
                        </div>
                        <div>
                            <p>Chiuso</p>
                            <p>8:30 - 19:00</p>
                            <p>9:00 - 19:00</p>
                            <p>9:00 - 13:00, 15:00 - 19:00</p>
                        </div>
                    </div>
                </div>

                <div className={styles.hours}>
                    <h3>Orari laboratorio</h3>
                    <div className={styles.schedule}>
                        <div>
                            <p>Lunedì</p>
                            <p>Mar - Sab</p>
                            <p>Domenica</p>
                        </div>
                        <div>
                            <p>Chiuso</p>
                            <p>7:30 - 13:00, 14:30 - 16:00</p>
                            <p>8:00 - 12:30</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.piva}>
                <p>P.I. 03468950120</p>
            </div>

            <div className={styles.legal}>
                <p>Informazioni Legali | Privacy</p>
            </div>
        </footer>
    );
}
