// src/app/layout.js

import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css'; // Assicurati di avere gli stili globali, se necessari

export const metadata = {
  title: "C'est la Vie - Pasticceria",
  description: 'Prenota i migliori dolci a Varese',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
