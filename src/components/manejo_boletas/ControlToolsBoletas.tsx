'use client'

import React from "react";
import { InputSwitch } from "primereact/inputswitch";
// import { Calendar } from "primereact/calendar";

interface ControlToolsBoletasProps {
  estado: boolean;
  setestado: (value: boolean) => void;
  date_inicio: Date;
  date_final: Date;
  setDateInicio: (value: Date | null) => void;
  setDateFinal: (value: Date | null) => void;
}

export default function ControlToolsBoletas({
  estado,
  setestado,
  date_inicio,
  date_final,
  setDateInicio,
  setDateFinal
}: ControlToolsBoletasProps) {
  return (
    <div className="card flex-auto md:flex-wrap gap-3 p-fluid">
      <div className="flex justify-content-center align-items-center m-0 p-0 gap-5">
        {/* <div className="flex-auto">
          <label htmlFor="buttondisplay" className="font-bold block mb-2">
            Fecha Inicio
          </label>
          <Calendar
            id="buttondisplay"
            value={date_inicio}
            onChange={(e) => setDateInicio(e.value)}
            showIcon
          />
        </div>
        <div className="flex-auto">
          <label htmlFor="buttondisplay" className="font-bold block mb-2">
            Fecha Final
          </label>
          <Calendar
            id="buttondisplay"
            value={date_final}
            onChange={(e) => setDateFinal(e.value)}
            showIcon
          />
        </div> */}
        <div>
          <label htmlFor="estado_boleta" className="font-bold block mb-2" >Ver Cerradas</label>
          <InputSwitch
            inputId="estado_boleta"
            checked={estado}
            onChange={(e) => setestado(e.value!)}
          />
          
        </div>
      </div>
    </div>
  );
}
