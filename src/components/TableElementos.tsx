'use client'

import { DataTable, DataTableRowToggleEvent } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  SET_ACTIVIDAD,
} from "../context/userSlice";

import React from "react";
import { Button } from "primereact/button";
import { DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { getElemDetail } from "@/api/elementos/actions";

import { useBoletaStore } from "@/context/botelaStore";



interface Actividad {
  codigo_manobra: string | number;
  actividad: string;
  unidad_medida: string | number;
  cantidad: number;
}

interface Elemento {
  cod_ele_sec: string;
  comentario: string | null;
  unidad_medida: string | number | null | undefined;
  cantidad_elemento: number | any;
  actividades: Actividad[];
  children?: boolean;
}


function TableElementos() {
  //Variables de estado locales
  const [datos, setdatos] = useState<Elemento[]>([]);

  const [Loading, setLoading] = useState(true);

  const variableEntorno = useBoletaStore((s) => s.variablesEntorno)
  const { idProyecto, idSector } = variableEntorno


  const dispatch = useDispatch();

  const [selectedElemento, setSelectedElemento] = useState(null);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);

  const fijoElemento = (valor: any) => {
    setSelectedElemento(valor);
  };

  const allowExpansion = (rowData: any) => {
    return rowData.children;
  };

  useEffect(() => {
    setLoading(true);


    const loadData = async () => {
      const data: Elemento[] | null = await getElemDetail(idProyecto, idSector)
      if (data) {
        setdatos(data);
        console.log(data)
      } else {
        setdatos([])
      }
      setLoading(false);
    }


    loadData()



  }, [idProyecto, idSector]);

  const expandirFila = (e: DataTableRowToggleEvent) => {
    setExpandedRows(e.data);
  };

  const templateButton = (data: any) => {
    return (
      <Button
        icon="pi pi-arrow-right"
        onClick={() => handleClick(data)}
      ></Button>
    );
  };

  const handleClick = (datos: any) => {
    dispatch(SET_ACTIVIDAD(datos));
  };

  const rowExpansionTemplate = (data: any) => {
    return (
      <div className="p-3">
        <h5>Elemento presupuestario - {data.comentario}</h5>
        <DataTable value={data.actividades} stripedRows selectionMode="single">
          <Column field="codigo_manobra" header="Id" sortable></Column>
          <Column field="actividad" header="Actividad" sortable></Column>
          <Column field="unidad_medida" header="Und.Med" sortable></Column>
          <Column field="cantidad" header="Cantidad" sortable></Column>
          <Column
            header="Procesar"
            body={(rowData) => (templateButton(rowData))}
          >
            {" "}
          </Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div className="card border border-gray-400 w-full">
      {Loading ? (
        <div className="block font-bold text-xl text-center p-4 mb-3">
          <p> Estamos recuperando la lista de elementos y sus actividades </p>
          <p> Por favor espere un momento...</p>
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <div>
          <div> <p className=" font-bold text-xl text-primary "> Elementos presupuestarios </p>  </div>
          <DataTable
            columnResizeMode="expand"
            value={datos}
            expandedRows={expandedRows}
            onRowToggle={(e) => expandirFila(e)}
            rowExpansionTemplate={rowExpansionTemplate}
            // onRowExpand={onRowExpand}
            size="small"
            stripedRows
            // tableStyle={{ minWidth: "10rem", width: "40rem" }}
            selectionMode="single"
            onSelectionChange={(e) => fijoElemento(e.value)}
            dataKey="cod_ele_sec"
            selection={selectedElemento}
            scrollable
            scrollHeight="380px"
          >
            <Column expander={allowExpansion} style={{ width: "5rem" }} />
            <Column field="cod_ele_sec" header="Código"></Column>
            <Column

              field="comentario"
              filter
              filterPlaceholder="Buscar por descripcion"
              sortable
              header="Descripción"
            ></Column>
            <Column field="unidad_medida" header="Und.Med"></Column>
            <Column field="cantidad_elemento" header="Cantidad"></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
}

export default TableElementos;
