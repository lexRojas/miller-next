'use client'

import React, { useEffect } from "react";

import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { getSectores } from "@/api/sectores/actions";

import { useBoletaStore } from "@/context/botelaStore";


type sectores = {
  presupuesto: string;
  codigo_sector: string;
  descripcion: string;
};



export default function ComboSectores() {

  const [Sectores, setSectores] = useState<sectores[]>([]);
  const [selectedSector, setselectedSector] = useState<sectores>();

  const variableEntorno = useBoletaStore((s) => s.variablesEntorno)
  const setSector = useBoletaStore((s) => s.setSector)


  const { idProyecto, idSector } = variableEntorno


  //obtengo todos los sectores de un proyecto 
  useEffect(() => {
    get_sectores(idProyecto);
     
  }, [idProyecto]);


  useEffect(() => {
    if (!Sectores.length) return;

    const sectorSeleccionado = Sectores.find(
      (e) => e.codigo_sector == idSector
    );

    if (sectorSeleccionado) {
      setselectedSector(sectorSeleccionado);
    }
  }, [Sectores, idSector]);


  // fijo el sector en el contexto 
  const fijarSectorID = (valor: sectores) => {
    const { codigo_sector } = valor
    setselectedSector(valor)

    //funcion del store 
    setSector(codigo_sector)

    console.log("fijarSectorID:", codigo_sector)
    sessionStorage.setItem("idSector", codigo_sector)

  }



  const get_sectores = async (presupuesto = "") => {

    const data = await getSectores(presupuesto)

    if (data) {

      setSectores(data.map((e) => ({
        presupuesto: e.presupuesto ?? "",
        codigo_sector: e.codigo_sector ?? "",
        descripcion: e.descripcion ?? ""
      })))
    } else {
      setSectores([
        {
          presupuesto: "999999",
          codigo_sector: "#",
          descripcion: "No hay sectores",
        },]

      )
    }
  };


  return (
    <div>
      <div className="grid ml-1 " >
        <label className="text-lg font-bold" htmlFor="cmb_selectores">
          {" "}
          Seleccione un Sector:
        </label>

        <Dropdown
          id="cmdFiltro"
          value={selectedSector}
          onChange={(e) => fijarSectorID(e.value)}
          options={Sectores}
          optionLabel="descripcion"
          placeholder="Seleccione un sector"
          className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
        />
      </div>
    </div>
  );
}
