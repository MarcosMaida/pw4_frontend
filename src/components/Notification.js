import { useEffect } from 'react';
import styles from './Notification.module.css';

export default function Notification({ message, onClose }) {
    useEffect(() => {
        // Imposta un timeout per chiudere la notifica automaticamente dopo 5 secondi
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.notification}>
            {message}
        </div>
    );
}
