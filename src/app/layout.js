// src/app/layout.js

"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <Head>
        <title>C'est la Vie - Pasticceria</title>
        <meta name="description" content="Prenota i migliori dolci a Varese" />
      </Head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
