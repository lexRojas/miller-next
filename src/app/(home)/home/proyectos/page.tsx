'use client'

import  { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

import { getProyectoByID } from "@/api/proyectos/actions";
import { useBoletaStore } from "@/context/botelaStore";

interface ProyectoItem {
  presupuesto: string;
  proyecto: string;
}

export default function Proyectos() {


  const { variablesEntorno } = useBoletaStore()

  const navegate = useRouter();

  const [proyecto, setProyecto] = useState("");
  const [mensaje, setMensaje] = useState(String || null);

  const msg = useRef(null)


  useEffect(() => {

    setProyecto(variablesEntorno.idProyecto)
    console.log(variablesEntorno.idProyecto)

  }, [])








  const fijarProyecto = (id: string, descripcion: string) => {
    sessionStorage.setItem("idProyecto", id);
    sessionStorage.setItem("descripcionProyecto", descripcion);
    sessionStorage.setItem("idSector", "");

    window.dispatchEvent(new Event("changeProyecto"))

  }



  const handleClickSelectProyect = async () => {


    const data = await getProyectoByID(proyecto)
    console.log(data)
    if (data) {

      fijarProyecto(data.presupuesto.toString(), data.proyecto ?? "")


    } else {
      setMensaje("El proyecto no existe!!!")
    }


  };



  return (

    <div className="container max-w-1/3 bg-white p-6 border rounded-xl border-blue-200 shadow-xl relative top-6  mx-auto grid grid-cols-4 gap-2">

      {/**BOTON */}

      <div className="col-span-4 text-2xl font-bold">
        <label htmlFor="txtproyecto"> Digite el número de proyecto (ej: 2026344):</label>
      </div>

      <div className="col-span-3">
        <div>
          <InputText
            className="block w-full p-inputtext-lg "
            id="txtproyecto"
            aria-describedby="aria-proyecto"
            value={proyecto}
            onChange={(e) => setProyecto(e.target.value)}
          />
        </div>

      </div>

      <div className="col-span-3 flex flex-row justify-content-center text-red-600 text-xl mt-3 justify-center">

        {mensaje && (
          <p>{mensaje}</p>
        )}


      </div>
      <Divider className="col-span-4" />
      <div className="col-span-2 flex flex-row justify-content-center">
        <Button
          label="Seleccionar proyecto"
          onClick={handleClickSelectProyect}
        />
      </div>

    </div>
  );
}
