'use client'

import React from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { convertDate_to_YMD } from "../../tools/convertDate";
import { getTimeHHMM } from "../../tools/getTimeHHMM";
import { CerrarBoletaInput,  cerrarBoletasByID } from "@/api/boleta/actions";

interface ActionBoletasProps {
  selectedProducts: any[] | null;
  estado: boolean;
  detalle_boletas: any[];
  setDetalle_Boletas: (value: any[]) => void;
}

export default function ActionBoletas({ selectedProducts, estado, detalle_boletas, setDetalle_Boletas }: ActionBoletasProps) {
  const router = useRouter();



  const toastControl = useRef<Toast>(null);

  const handleClickCancelar = () => {
    router.push("../home");
  };

  const handleClickCrearBoleta = () => {
    router.push("../home/boletaAsignacion");
  };

  const pacthCerrarBoletas = async (values: { id_boleta: number[]; fecha_final: string; hora_final: string; codigo_empleado?: string; }) => {
    if (values) {
    

      let result = true;
      for (const element of values.id_boleta) {

        const row: CerrarBoletaInput = {
          codigo_empleado: values.codigo_empleado ?? "",
          fecha_final: values.fecha_final,
          id_boleta: element,
          hora_final: values.hora_final
        };
        const response = await cerrarBoletasByID(row);
        result = result && (!!response);
      }
      return result;
    }
    return false;
  };






  const handleClickCerrar = async () => {

    if (selectedProducts) {
      const id: number[] = [];
      selectedProducts.forEach((element) => {
        id.push(element.id);
      });
      const valores = {
        id_boleta: id,
        fecha_final: convertDate_to_YMD(new Date()),
        hora_final: getTimeHHMM(),
      };

      const resultado = await pacthCerrarBoletas(valores)
      if (resultado) {

        let detalle_boletas_copia = JSON.parse(JSON.stringify(detalle_boletas));


        id.forEach(element => {
          detalle_boletas_copia = detalle_boletas_copia.filter((row: { id: number; }) => { return row.id !== element });
        })


        setDetalle_Boletas(detalle_boletas_copia)


      } else {
        toastControl.current?.show({
          severity: "error",
          summary: "Miller CR",
          detail: "Debes seleccionar alguna boleta de asignacion",
          life: 3000,
        });
      }
    }
  };

  return (
    <div className="card">
      <div className="flex justify-content-center align-center mt-4 gap-5">
        <Button label="Cerrar Boletas" onClick={handleClickCerrar} disabled={estado} />
        <Button
          severity="success"
          label="Crear Boleta"
          onClick={handleClickCrearBoleta}
        />
        <Button label="Cancelar" onClick={handleClickCancelar} />
      </div>
      <Toast ref={toastControl} />
    </div>
  );
}
