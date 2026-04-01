'use client'

import { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import TableEmpleadosView from "./TableEmpleadosView";
import { convertDate_to_YMD } from "../../tools/convertDate";
import { getTimeHHMM } from "../../tools/getTimeHHMM";

import Boleta from '@/components/Boleta';
import { useBoletaStore } from "@/context/botelaStore";
import { getBoletaDetail } from "@/api/boleta_detail/actions";
import { addBoletaEmpleadoBoleta, AddBoletaEmpleadoInput, getEmpleados } from "@/api/empleados/actions";
import { CerrarBoletaInput, cerrarBoletas } from "@/api/boleta/actions";

interface TableBoletasProps {
  estado: boolean;
  selectedProducts: any[] | null;
  setSelectedProducts: (value: any[] | null) => void;
  date_inicio: Date;
  date_final: Date;
  detalle_boletas: any[];
  setDetalle_Boletas: (value: any[]) => void;
}

export default function TableBoletas({
  estado,
  selectedProducts,
  setSelectedProducts,
  //date_inicio,
  //date_final,
  detalle_boletas,
  setDetalle_Boletas
}: TableBoletasProps) {
  // Variables del contexto


  const variableEntorno = useBoletaStore((s) => s.variablesEntorno)



  const id_proyecto_ = variableEntorno.idProyecto

  // Variables de estado interno



  const [optionsSelectedRow, setoptionsSelectedRow] = useState(null);
  // const [visibleLista, setVisibleLista] = useState(false);
  const [visibleAddEmployee, setVisibleAddEmployee] = useState(false);
  const [visibleRemoveEmployee, setVisibleRemoveEmployee] = useState(false);

  const [boletaClickAdd_Remove, setboletaClickAdd_Remove] = useState(null);

  const [empleados, setEmpleados] = useState([]);

  const [visible, setVisible] = useState(false)
  const [data, setData] = useState([])


  const toastControl = useRef<Toast>(null);

  // Componentes internos

  const acionsEmployee = (options: any) => {
    return (
      <div>
        <Button
          className="m-1"
          icon="pi pi-plus"
          severity={estado ? "secondary" : "success"}
          disabled={estado}
          onClick={() => showEmpleadosAdd(options)}
        />
        <Button
          className="m-1"
          icon="pi pi-minus"
          severity={estado ? "secondary" : "danger"}
          disabled={estado}
          onClick={() => showEmpleadosRemove(options)}
        />

        <Button
          className="m-1"
          style={{ background: 'green' }}
          icon="pi pi-whatsapp"
          onClick={() => showBoleta(options)}
        />
      </div>
    );
  };

  const CountEmployee = (options: { empleados: any; }) => {
    const { empleados } = options;

    const cantidad = empleados.length;

    return <div className="p-datatable-tbody">{cantidad}</div>;
  };

  // funciones
  // METODO PARA PRESENTAR LA PANTALLA DE EMPLEADOS.



  const showBoleta = (options: any) => {
    setVisible(true)

    options.empleados_asignados = options.empleados


    setData(options)
  }

  // METODO PARA PRESENTAR LA PANTALLA DE ELIMINAR  EMPLEADOS.

  const showEmpleadosRemove = (options: any) => {
    if (options.empleados.length > 0) {
      const { empleados } = options;
      const { id } = options;

      setoptionsSelectedRow(options);
      setboletaClickAdd_Remove(id);
      setEmpleados(empleados);
      setVisibleRemoveEmployee(true);
    } else {

      toastControl.current!.show({
        severity: "error",
        summary: "Miller CR",
        detail: "No existen empleados que eliminar.",
        life: 3000,
      });
    }
  };

  // METODO PARA PRESENTAR LA PANTALLA DE ADD EMPLEADOS.

  const showEmpleadosAdd = (options: any) => {
    const { id } = options
    setoptionsSelectedRow(options);
    setboletaClickAdd_Remove(id);

    const get_empleados = async (presupuesto = 0) => {
      if (presupuesto) {

        const data = await getEmpleados(presupuesto)
        if (data!) {
          toastControl.current!.show({
            severity: 'error',
            summary: 'Miller CR',
            detail: 'No hay empleados que añadir',
            life: 3000
          })
        } else {
          setEmpleados(data)
        }

      }
    };




    get_empleados(Number(id_proyecto_));


  };

  // PROCESOS PARA SACAR EMPLEADOS (PATCH) DE LAS BOLETAS DE ASIGNACION

  const pacthEmployee = async (values: CerrarBoletaInput) => {
    if (values) {

       await cerrarBoletas(values)
    }
  };

  const removeEmployee = async (empleadosSelected: any) => {
    const resultado = await pacthEmployee({
      fecha_final: convertDate_to_YMD(new Date()),
      hora_final: getTimeHHMM(),
      id_boleta: boletaClickAdd_Remove!,
      codigo_empleado: empleadosSelected.codigo_empleado,
    });

    if ( resultado!) {
      const detalle_boletas_copia = JSON.parse(JSON.stringify(detalle_boletas));

      let index = -1;
      let i = -1;

      detalle_boletas_copia.filter((row: { id: null; }) => {
        i++;
        if (row.id === boletaClickAdd_Remove) {
          index = i;
        }
        return true;
      });

      detalle_boletas_copia[index].empleados = detalle_boletas_copia[
        index
      ].empleados.filter((row: { codigo_empleado: any; }) => {
        return row.codigo_empleado !== empleadosSelected.codigo_empleado;
      });

      setDetalle_Boletas(detalle_boletas_copia);
    }

    setVisibleRemoveEmployee(false);
  };

  // PROCESOS PARA AÑADIR EMPLEADOS ..

  const add_empleados = async (values:AddBoletaEmpleadoInput) => {
    console.log(values)
    if (values) {
      
      await addBoletaEmpleadoBoleta(values)

    }
  };

  const addEmployee = async (empleadosSelected: any) => {

    const valores:AddBoletaEmpleadoInput = {
      id_boleta: boletaClickAdd_Remove!,
      codigo_empleado: empleadosSelected.codigo_empleado,
      fecha_inicio: convertDate_to_YMD(new Date()),
      hora_inicio: getTimeHHMM(),
    };

    const resultado = await add_empleados(valores);

    if (resultado!) {
      const detalle_boletas_copia = JSON.parse(JSON.stringify(detalle_boletas));

      let index = -1;
      let i = -1;

      detalle_boletas_copia.filter((row: { id: null; }) => {
        i++;
        if (row.id === boletaClickAdd_Remove) {
          index = i;
        }
        return true;
      });

      const empleados = detalle_boletas_copia[index].empleados
      empleados.push(empleadosSelected)

      setDetalle_Boletas(detalle_boletas_copia);
    }

    setVisibleAddEmployee(false);
  };

  useEffect(() => {
    const getBoletas = async () => {

      const data = await getBoletaDetail(id_proyecto_, estado)
      console.log(data)
      setDetalle_Boletas(data)

    };
    getBoletas();
  }, [id_proyecto_,  estado, setDetalle_Boletas]);

  return (
    <div className="card">
      <DataTable
        value={detalle_boletas}
        selectionMode="multiple"
        selection={selectedProducts || []}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
        rows={10}
        paginator
        emptyMessage="No existen boletas de asignacion de labores o revise el filtro aplicado"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>

        <Column field="id" header="#Boleta" ></Column>
        <Column
          field="fecha_inicio"
          filter
          header="Fecha Apertura"
          sortable
        ></Column>
        <Column field="codigo_manobra" header="Codigo"></Column>
        <Column field="comentarios" header="Actividad" sortable filter></Column>
        <Column field="cantidad_asignada" header="Cantidad Asignada"></Column>
        <Column header="Empleados" body={CountEmployee} align="center"></Column>
        <Column
          header="Acciones (Empleados)"
          body={acionsEmployee}
          align="center"
        ></Column>
      </DataTable>
      <Toast ref={toastControl} />

      <Dialog
        header="Lista de empleados (Disponibles para añadir a la actividad)"
        visible={visibleAddEmployee}
        style={{ width: "30vw" }}
        onHide={() => setVisibleAddEmployee(false)}
      >
        <TableEmpleadosView
          empleados={empleados}
          buttonOptions={[
            { visible: true, label: "Añadir", action: addEmployee },
            { visible: true, label: "Cancelar", action: setVisibleAddEmployee },
          ]}
          optionsSelectedRow={optionsSelectedRow}
        />
      </Dialog>
      <Dialog
        header="Lista de empleados para Eliminar de la actividad"
        visible={visibleRemoveEmployee}
        style={{ width: "30vw" }}
        onHide={() => setVisibleRemoveEmployee(false)}
      >
        <TableEmpleadosView
          empleados={empleados}
          buttonOptions={[
            { visible: true, label: "Remover", action: removeEmployee },
            {
              visible: true,
              label: "Cancelar",
              action: setVisibleRemoveEmployee,
            },
          ]}
          optionsSelectedRow={optionsSelectedRow}
        />
      </Dialog>
      <Dialog
        header="Envio de Boleta por correo"
        visible={visible}
        style={{ width: 'clamp(50rem, 50rem, 100%)' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <Boleta user={"user"} boleta={data} />
      </Dialog>
    </div>
  );
}
