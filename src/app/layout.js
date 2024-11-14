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
    setLoading(true);

    const timeout = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="it">
      <Head>
        <title>C'est la Vie - Pasticceria</title>
        <meta name="description" content="Prenota i migliori dolci a Varese" />
      </Head>
      <body>
        <Header />
        {loading && <Loader />}
        {!loading && <main>{children}</main>}
        <Footer />
      </body>
    </html>
  );
}
