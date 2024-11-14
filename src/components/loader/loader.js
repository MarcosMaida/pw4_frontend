// src/components/loader/loader.js

import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <img src="/images/logo.webp" alt="Logo C'est la Vie" className={styles.logo} />
            <img src="/images/loader.gif" alt="Caricamento in corso..." className={styles.spinner} />
        </div>
    );
};

export default Loader;
