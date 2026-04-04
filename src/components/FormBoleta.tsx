'use client'

import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";
import { convertDate_to_YMD } from "../tools/convertDate"
import { getTimeHHMM } from "../tools/getTimeHHMM"
import { useBoletaStore } from "@/context/botelaStore";



function FormBoleta() {

  const [isValid, setIsValid] = useState(true);
  const ubicacion_ref = useRef<any>(null);
  const toastRef = useRef<Toast>(null)

  const setDatosBoleta = useBoletaStore((s) => s.setDatosBoleta)






  const variablesBoleta = useBoletaStore((s) => s.variablesBoleta)

  const [isValidCantidad, setisValidCantidad] = useState(true)
  //const [visible , setVisible ] = useState(false)


  //Manejador del estado 
  const changeBoletaData = (key: string, value: any) => {

    setDatosBoleta({ [key]: value });
  };




  useEffect(() => {

    setDatosBoleta({
      fecha_inicio: convertDate_to_YMD(new Date()),
      fecha_final: convertDate_to_YMD(new Date()),
      hora_inicio: getTimeHHMM(),
      hora_final: "17:00",
      ubicacionPlanos: "",
    });

    console.log("ingreso a formboleta")


    ubicacion_ref.current?.focus();
  }, [setDatosBoleta]);

  const handleCantidadMedidaChange = (v: number) => {

    if ((v > variablesBoleta.cantidad_total) || (v <= 0)) {

      setisValidCantidad(false)
    } else {
      setisValidCantidad(true)
    }

    changeBoletaData("cantidad_digitada", v)

  };

  const handleHoraInicioChange = (v: string) => {
    const horaRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (horaRegex.test(v)) {

      changeBoletaData("hora_inicio", v)

      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleHoraInicioOnBlur = (v: string) => {

    const horaRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (!horaRegex.test(v)) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Digito una hora en formato incorrecto HH:MM (hora militar)',
        life: 3000,
      })
      //state_SetHoraInicio('')  
    }
  };


  return (
    <div className="card border-gray-400 border-1 p-5 mt-5 flex flex-col" >
      <div>
        {" "}
        <p className="font-bold text-xl text-primary ">
          {" "}
          Formulario de asignación de labores{" "}
        </p>{" "}
      </div>
      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="planos">Ubicación en Planos</label>
        <InputText
          ref={ubicacion_ref}
          aria-describedby="planos-help"
          onChange={(e) => changeBoletaData("ubicacionPlanos", e.target.value)}
          value={variablesBoleta.ubicacionPlanos}
        />
        <small id="planos-help">
          Indique la sección del plano donde se realizará la actividad.
        </small>
      </div>

      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="planos">Comentarios</label>
        <InputTextarea
          value={variablesBoleta.descripcion}
          onChange={(e) => changeBoletaData("descripcion", e.target.value)}
          aria-describedby="planos-help"
          rows={5}
        />
      </div>
      <div className="flex flex-row pb-2 gap-3">
        <div className="flex flex-col gap-2 p-0 col-6">
          <label htmlFor="planos">Cantidad de medida</label>
          <InputNumber
            value={variablesBoleta.cantidad_digitada}
            onChange={(e) => handleCantidadMedidaChange(e.value!)}
            onBlur={(e) => handleHoraInicioOnBlur(e.target.value)}
            aria-describedby="planos-help"
            className={!isValidCantidad ? "p-invalid" : ""}
          />
          {!isValidCantidad && (
            <small className="p-error">Cantidad no permitida </small>
          )}
        </div>
        <div className="flex flex-col gap-2 p-0 col-6">
          <label htmlFor="planos">Unidad de Medida</label>
          <InputText
            value={variablesBoleta.unidad_medida ?? ''}
            aria-describedby="planos-help"
            disabled
          />
        </div>
      </div>
      <div className="flex flex-row pb-2 gap-3">
        <div className="flex flex-col gap-2 p-0 col-6">
          <label htmlFor="planos">Hora Inicio:</label>
          <InputMask
            mask="99:99"
            value={variablesBoleta.hora_inicio}
            onChange={(e) => handleHoraInicioChange(e.target.value ?? "")}
            onBlur={(e) => handleHoraInicioChange(e.target.value ?? "")}
            aria-describedby="hora_help"
            className={!isValid ? "p-invalid" : ""}
          />
          {!isValid && (
            <small className="p-error">Please enter a valid time (HH:MM)</small>
          )}
        </div>
        <div className="flex flex-col gap-2 p-0 col-6">
          <label htmlFor="planos">Hora Final</label>
          <InputMask
            value={variablesBoleta.hora_final}
            mask="99:99"
            onChange={(e) => changeBoletaData("hora_final", e.target.value ?? "")}
            disabled
            aria-describedby="hora_help"
          />
          <small>Formato HH:MM </small>
        </div>
      </div>
      <Toast ref={toastRef} />
    </div>
  );
}

export default FormBoleta;
