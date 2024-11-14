// src/app/layout.js

"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/Footer';
import Loader from '../components/loader/loader';
import './globals.css';
import Head from 'next/head';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Activa el Loader al cambiar de ruta
    setLoading(true);

    // Simula un breve retardo para mostrar el Loader
    const timeout = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timeout);
  }, [pathname]); // El efecto se ejecuta cada vez que cambia la ruta

  return (
    <html lang="it">
      <Head>
        <title>C'est la Vie - Pasticceria</title>
        <meta name="description" content="Prenota i migliori dolci a Varese" />
      </Head>
      <body>
        <Header />
        {loading && <Loader />} {/* Asegúrate de mostrar el Loader mientras `loading` es true */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
