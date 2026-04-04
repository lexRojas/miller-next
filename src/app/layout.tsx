import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

import "@/styles/menu.css"
import '@/styles/index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons

import "@/styles/flags.css";

import faviconligth from "@/favicon-light.ico"
import favicondark from "@/favicon-dark.ico"


import { ToastContainer } from "react-toastify";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miller Horas",
  description: "Control de rendimientos horas hombre",
  icons: [
    {
      url: favicondark.src,
      type: "image/x-icon",
      media: "(prefers-color-scheme: dark)",
    },
    {
      url: faviconligth.src,
      type: "image/x-icon",
      media: "(prefers-color-scheme: light)",
    },

  ],

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>

  );
}
