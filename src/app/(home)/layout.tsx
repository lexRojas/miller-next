'use client'

import React, { useEffect } from 'react'
import MainMenu from '@/components/MainMenu';
import { useBoletaStore } from '@/context/botelaStore';

let inactivityTimer: string | number | NodeJS.Timeout | undefined;
const TIMEOUT = 1000 * 60 * 10; // 10 minutos

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    // Lógica de expiración: borra el token si se detecta inactividad
    console.log("Inactividad detectada, token expirado");
    // Elimina el token del localStorage o cookies
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirige al login o realiza la acción que desees
    window.location.href = "/";
  }, TIMEOUT);
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    // Escuchar eventos de interacción para resetear el temporizador
    const events = ['mousemove', 'keydown', 'click'];

    events.forEach(event =>
      window.addEventListener(event, resetInactivityTimer)
    );

    // Resetear el temporizador al principio
    resetInactivityTimer();

    // Limpiar los event listeners cuando el componente se desmonte
    return () => {
      events.forEach(event =>
        window.removeEventListener(event, resetInactivityTimer)
      );
      clearTimeout(inactivityTimer);
    };
  }, []);


  const setProyecto = useBoletaStore(s => s.setProyecto)
  const setSector = useBoletaStore(s => s.setSector)

  useEffect(() => {
    const idProyecto = sessionStorage.getItem("idProyecto");
    const descripcion = sessionStorage.getItem("descripcionProyecto");
    const idSector = sessionStorage.getItem("idSector");
    if (idProyecto) {
      setProyecto(idProyecto, descripcion!);
    }

    if (idSector) {
      setSector(idSector)
    }

  }, [setProyecto, setSector]);




  return (

    <div>
      <MainMenu />
      {children}
    </div>

  );
}
