import type { Metadata } from "next";
import "./globals.css";
import {AuthenticatorProvider} from "@aws-amplify/ui-react-core";


export const metadata: Metadata = {
  title: "Formativa AI - Facilitando el Acceso a la Tecnología y Educación",
  description: "Formativa AI reduce las barreras de entrada a una carrera en tecnología. Ofrecemos recursos, guías y " +
      "apoyo con becas, universidades y programas disponibles, guiándote en el proceso de aplicación. Únete a " +
      "Formativa AI para transformar tu futuro educativo y profesional.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="es-ES">
    <head>
      <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"/>
      <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="any"
      />
      <link
          rel="android-chrome-192x192"
          href="/android-chrome-192x192.png"
          sizes="any"
      />
      <link
          rel="android-chrome-512x512"
          href="/android-chrome-512x512.png"
          sizes="any"
      />
      <link
          rel="favicon-16x16"
          href="/favicon-16x16.png"
          sizes="any"
      />
      <link
          rel="favicon-32x32"
          href="/favicon-32x32.png"
          sizes="any"
      />
    </head>
    <body className="bg-black">{children}</body>
    </html>
  );
}
