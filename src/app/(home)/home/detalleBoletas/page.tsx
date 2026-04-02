'use client'

import { useState } from "react";
import TableBoletas from "@/components/manejo_boletas/TableBoletas";
import ControlToolsBoletas from "@/components/manejo_boletas/ControlToolsBoletas";
import ActionBoletas from "@/components/manejo_boletas/ActionBoletas";

function DetalleBoletas() {
  const [estado, setestado] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[] | null>(null);
  const [date_inicio, setDateInicio] = useState<Date | null>(new Date());
  const [date_final, setDateFinal] = useState<Date | null>(new Date());
  const [detalle_boletas, setDetalle_Boletas] = useState<any[]>([]);

  return (
    <div className="card flex flex-col col-12 p-3 md:col-10 mt-2">
      <div className="flex-row">
        <p className="font-bold text-3xl text-primary">
          Detalle de Boleta de Asignación
        </p>
      </div>
      <div className="flex-row">
        <ControlToolsBoletas
          estado={estado}
          setestado={setestado}
          date_inicio={date_inicio!}
          date_final={date_final!}
          setDateInicio={setDateInicio}
          setDateFinal={setDateFinal}
        />
      </div>
      <div>
        <TableBoletas
          estado={estado}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          date_inicio={date_inicio!}
          date_final={date_final!}
          detalle_boletas = {detalle_boletas} 
          setDetalle_Boletas = {setDetalle_Boletas}
        />
      </div>
      <div>
        <ActionBoletas 
          selectedProducts={selectedProducts} 
          estado={estado} 
          detalle_boletas = {detalle_boletas} 
          setDetalle_Boletas = {setDetalle_Boletas}
        />
      </div>
    </div>
  );
}

export default DetalleBoletas;
