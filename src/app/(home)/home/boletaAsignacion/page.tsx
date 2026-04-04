'use client'

import React, { useEffect } from "react";
import ComboSectores from "@/components/ComboSectores";
import TableElementos from "@/components/TableElementos";
import FormBoleta from "@/components/FormBoleta";
import TableEmpleados from "@/components/TableEmpleados";
import { useBoletaStore } from "@/context/botelaStore";


function BoletaAsignacion() {


  const setProyecto = useBoletaStore((s) => s.setProyecto)
  const setSector = useBoletaStore((s) => s.setSector)

  useEffect(() => {

    const idProyecto = sessionStorage.getItem("idProyecto") || "";
    const idSector = sessionStorage.getItem("idSector") || "";
    const descripcionProyecto = sessionStorage.getItem("descripcionProyecto") || "";



    setProyecto(idProyecto, descripcionProyecto)
    setSector(idSector)


  }, [setProyecto, setSector]);



  return (
    <div className="card border-gray-400 border-1 m-10 p-5 flex  flex-col md:grid  md:grid-cols-2  gap-5 mt-2">

      {/* TITULO*/}
      <div className="flex flex-row ">
        <p className="font-bold text-5xl text-primary">
          Boleta de Asignación
        </p>
      </div>

      <div className="flex flex-col ">
        <ComboSectores />
      </div>


      <div className="flex flex-col ">
        <TableElementos />
      </div>
      <div className="flex flex-col ">
        <FormBoleta />
      </div>



      <div className="flex flex-col  col-span-2">
        <TableEmpleados />
      </div>


    </div>
  );
}

export default BoletaAsignacion;
