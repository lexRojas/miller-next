'use client'


import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import { useRouter } from "next/navigation";


import { useEffect } from 'react'





export default function MainMenu() {




  const menu = useRef<TieredMenu | null>(null);
  const navegate = useRouter();

  const [proyectoActivo, setProyectoActivo] = useState({
    idProyecto: "",
    descripcionProyecto: ""
  })

  useEffect(() => {

    setProyectoActivo({
      idProyecto: sessionStorage.getItem("idProyecto") ?? "",
      descripcionProyecto: sessionStorage.getItem("descripcionProyecto") ?? ""
    })


    const handleProyectoChange = () => {
      // Lógica para actualizar el estado cuando cambie el proyecto

      setProyectoActivo({
        idProyecto: sessionStorage.getItem("idProyecto") ?? "",
        descripcionProyecto: sessionStorage.getItem("descripcionProyecto") ?? ""
      })


    };

    window.addEventListener("changeProyecto", handleProyectoChange);

    return () => {
      window.removeEventListener("changeProyecto", handleProyectoChange);
    };
  }, [])

  const items = [
    {
      label: "Proyectos",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        navegate.push("/home/proyectos");
      },
    },
    {
      label: "Procesos",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Crear Boleta Asignación",
          icon: "pi pi-fw pi-align-left",
          command: () => {
            navegate.push("/home/boletaAsignacion");
          },
        },
        {
          label: "Ver boletas asignadas",
          icon: "pi pi-fw pi-align-left",
          command: () => {
            navegate.push("/home/detalleBoletas");
          },
        }],
    },
    {
      label: "Reportes",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Reporte 1",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            navegate.push("/");
          },
        },
        {
          label: "Reporte 2",
          icon: "pi pi-fw pi-user-minus",
          command: () => {
            navegate.push("/");
          },
        },
      ],
    },
    {
      label: "Catálogos",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Cat  1",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            navegate.push("/");
          },
        },
        {
          label: "Cat  2",
          icon: "pi pi-fw pi-user-minus",
          command: () => {
            navegate.push("/");
          },
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: "Seguridad",
      icon: "pi pi-fw pi-user",
      command: () => {
        navegate.push("/");
      },
    },

    {
      separator: true,
    },

    {
      label: "Salir",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        navegate.push("/");
      },
    },
  ];

  return (
    <div className="flex menu-barra">

      <div className="col-fixed menu-botton">
        <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
        <Button
          label="Menú"
          icon="pi pi-bars"
          onClick={(e) => menu.current?.toggle(e)}
        />
      </div>
      <div className="flex flex-grow-1 justify-content-evenly  align-items-center flex-wrap">
        <div className="flex m-0">
          {/* <img className="" src={miller} alt="M" width={35} height={35} /> */}
          <label className="menu-titulo px-2"> Miller Constructora 2026</label>
        </div>
        {proyectoActivo.idProyecto !== "" ? (<>
          <p className="menu-subtitulo"> {proyectoActivo.descripcionProyecto} </p>
          <p>+++</p>
          <p className="menu-subtitulo"> {proyectoActivo.idProyecto} </p>
        </>
        ) : (
          <p className="menu-error"> No existe proyecto ! </p>
        )}
      </div>
    </div>
  );
}
