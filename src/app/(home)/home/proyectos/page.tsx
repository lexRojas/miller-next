'use client'

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages"

import { getProyectos } from "@/api/proyectos/actions";

interface ProyectoItem {
  presupuesto: string;
  proyecto: string;
}

export default function Proyectos() {

  const navegate = useRouter();



  const [filtro, setfiltro] = useState("");
  const [selectedProyect, setSelectedProyect] = useState({
    presupuesto: "",
    proyecto: "",
  });
  const msg = useRef(null)

  const [tb_presupuesto, setTb_presupuesto] = useState<ProyectoItem[]>([])


  const get_presupuesto = async (value = "") => {

    const presupuesto = await getProyectos()

    if (presupuesto) {
      const presupuestoFilter = presupuesto.filter((item: any) => (item.proyecto?.toUpperCase().includes(value)))

      if (presupuestoFilter.length > 0) {
        const presupuestoMapa = presupuestoFilter.map((i: any) => ({
          presupuesto: i.presupuesto,
          proyecto: i.proyecto
        }))
        setTb_presupuesto(presupuestoMapa)
      } else {
        setTb_presupuesto([])
      }
    }





  };

  const fijarProyecto = (id: string, descripcion: string) => {
    sessionStorage.setItem("idProyecto", id);
    sessionStorage.setItem("descripcionProyecto", descripcion);
    sessionStorage.setItem("idSector", "");

    window.dispatchEvent(new Event("changeProyecto"))

  }



  const handleClickSelectProyect = () => {


    if (selectedProyect === null) {

    } else {
      const { presupuesto, proyecto } = selectedProyect;
      fijarProyecto(presupuesto, proyecto);
      navegate.push("/home");

    }
  };

  const handleClickFilter = () => {
    get_presupuesto(filtro.toUpperCase());
  };

  useEffect(() => {
    get_presupuesto();
     
  }, []);

  useEffect(() => {
     
    if (tb_presupuesto.length == 0) {
      setSelectedProyect({ presupuesto: "", proyecto: "" });
    }
  }, [tb_presupuesto]);

  return (

    <div className="container max-w-1/3 bg-white p-6 border rounded-xl border-blue-200 shadow-xl relative top-6  mx-auto grid grid-cols-4 gap-2">

      {/**BOTON */}

      <div className="col-span-4">
        <label htmlFor="txtFiltro"> Filtrar los proyectos por:</label>
      </div>

      <div className="col-span-3">
        <div>
          <InputText
            className="block w-full"
            id="txtFiltro"
            aria-describedby="aria-filtro"
            onChange={(e) => setfiltro(e.target.value)}
          />
        </div>
        <div>
          <small
            className="block"
            id="aria-filtro">
            {" "}
            Digite palabras que describan el proyecto{" "}
          </small>
        </div>
      </div>


      {/**BOTON */}
      <div className="col-span-1 ">
        <Button
          className="w-full"
          label="Filtrar" onClick={handleClickFilter} />
      </div>


      <div className="col-span-4 ">
        <div >
          <label htmlFor="cmdFiltro"> Seleccione el filtro </label>
        </div>
        <div >
          <Dropdown
            id="cmdFiltro"
            value={selectedProyect}
            onChange={(e) => setSelectedProyect(e.value)}
            options={tb_presupuesto}
            optionLabel="proyecto"
            placeholder="Selecciones un presupuesto"
            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />

        </div>
      </div>
      <Divider className="col-span-4" />
      <div className="col-span-2 flex flex-row justify-content-center">
        <Button
          label="Seleccionar proyecto"
          onClick={handleClickSelectProyect}
        />
      </div>
      <div className="col-span-2 flex flex-row justify-content-center">

        <Messages ref={msg} />


      </div>
    </div>
  );
}
