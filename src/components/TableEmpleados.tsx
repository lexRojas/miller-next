'use client'


import React from "react";
import { useState, useEffect, useRef } from "react";

import { DataTable, DataTableValueArray } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";


import { useRouter } from "next/navigation";
import Boleta from "@/components/Boleta";
import { useAppSelector } from "@/context/hooks";
import { getEmpleados } from "@/api/empleados/actions";
import { crearBoleta } from "@/api/boleta/actions";

import { useBoletaStore } from "@/context/botelaStore";


type PostBoletaInput = {
  fecha_inicio: string
  proyecto?: string | null
  ubicacion?: string | null
  comentarios?: string | null
  cantidad_medida?: number | null
  unidad_medida?: string | null
  hora_inicio?: string | null
  hora_final?: string | null
  cerrada?: boolean | null
  codigo_manobra?: number | null
  fecha_final: string

  empleados_asignados: {
    codigo_empleado: string
    nombre_completo: string
  }[]
}


interface Empleado {
  codigo_empleado: string | null;
  nombre_completo: string;
  nombre_codigo: string;
}



function TableEmpleados() {


  const variableEntorno = useBoletaStore((s) => (s.variablesEntorno))
  const { idProyecto } = variableEntorno


  const [datosEmpleadosDisponibles, setDatosEmpleadosDisponibles] = useState<Empleado[]>([]);
  const [datosEmpleadosAsignados, setDatosEmpleadosAsignados] = useState<Empleado[]>([]);

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);


  const [selectedEmpleadoDisponible, setSelectedEmpleadoDisponible] = useState<DataTableValueArray>([]);
  const [selectedEmpleadoAsignado, setSelectedEmpleadoAsignado] = useState<DataTableValueArray>([]);



  const user = useAppSelector((s) => s.user);
  const [data, setData] = useState<PostBoletaInput>();





  const fecha_inicio_ = useAppSelector((s) => s.boleta.fecha_inicio);
  const proyecto_ = useAppSelector((s) => s.boleta.proyecto);
  const ubicacion_ = useAppSelector((s) => s.boleta.ubicacion);
  const comentarios_ = useAppSelector((s) => s.boleta.comentarios);
  const cantidad_medida_ = useAppSelector((s) => s.boleta.cantidad_medida);
  const unidad_medida_ = useAppSelector((s) => s.boleta.unidad_medida);
  const hora_inicio_ = useAppSelector((s) => s.boleta.hora_inicio);
  const hora_final_ = useAppSelector((s) => s.boleta.hora_final);
  const cerrada_ = useAppSelector((s) => s.boleta.cerrada);
  const codigo_manobra_ = useAppSelector((s) => s.boleta.codigo_manobra);
  const fecha_final_ = useAppSelector((s) => s.boleta.fecha_final);
  const cantidad_mano_obra_ = useAppSelector((s) => s.user.actividad.cantidad);

  // const confirm1 = () => {
  //   confirmDialog({
  //     message: messageContent,
  //     //"Boleta asignada con exito! ¿Desea ir a ver las boletas asignadas? ",
  //     header: "Confirmation",
  //     icon: "pi pi-thumbs-up",
  //     accept,
  //     reject,
  //   });
  // };

  const messageContent = (
    <div>
      <p className="font-bold text-m text-primary">
        {" "}
        <strong>Se ha incluido su boleta de asignacion. </strong>{" "}
      </p>
      <p className="  text-s text-secundary">
        ¿Desea ir a ver las boleta asignadas?
      </p>
    </div>
  );

  const accept = () => {
    navegate.push("home/detalleBoletas");
  };
  const reject = () => {
    window.location.reload();
  };

  const toastRef = useRef(null);
  const navegate = useRouter();

  const get_empleados = async (presupuesto: string | number = 0) => {
    if (presupuesto) {


      const empleados = await getEmpleados(presupuesto)

      if (empleados) {
        console.log(empleados)
        setDatosEmpleadosDisponibles(empleados);
      }
    }
  };

  const fijoEmpleadoDisponible = (valor: DataTableValueArray) => {
    setSelectedEmpleadoDisponible(valor);
  };

  const fijoEmpleadoAsignado = (valor: DataTableValueArray) => {
    setSelectedEmpleadoAsignado(valor);
  };

  const handleClickAsignar = () => {
    let nuevoEmpleadosDisponibles = datosEmpleadosDisponibles;

    if (selectedEmpleadoDisponible) {
      // si la lista de empleados asignados ya tiene empleados
      if (datosEmpleadosAsignados) {
        const array_asignados = [
          ...datosEmpleadosAsignados,
          ...(selectedEmpleadoDisponible as Empleado[]),
        ];
        setDatosEmpleadosAsignados(array_asignados as Empleado[]);
      } else {
        //si la lista de empleados asignados esta vacia
        setDatosEmpleadosAsignados(selectedEmpleadoDisponible as Empleado[]);
      }

      // elimino de la lista de disponibles los empleados asignados

      (selectedEmpleadoDisponible as Empleado[]).forEach((element) => {
        nuevoEmpleadosDisponibles = nuevoEmpleadosDisponibles.filter(
          (item) => item.codigo_empleado !== element.codigo_empleado
        );

        setDatosEmpleadosDisponibles(nuevoEmpleadosDisponibles);
      });
    } else {
      (toastRef.current as any)?.show({
        severity: "error",
        summary: "Error",
        detail: "No ha seleccionado un empleado disponible de la lista",
        life: 3000,
      });
    }
  };

  const handleClickDevolver = () => {
    let nuevoEmpleadosAsignados = datosEmpleadosAsignados;

    if (selectedEmpleadoAsignado) {
      // si la lista de empleados disponibles ya tiene empleados
      if (datosEmpleadosDisponibles) {
        let array_disponibles = datosEmpleadosDisponibles;
        array_disponibles = [...array_disponibles, ...(selectedEmpleadoAsignado as Empleado[])];
        setDatosEmpleadosDisponibles(array_disponibles);
      } else {
        //si la lista de empleados asignados esta vacia
        setDatosEmpleadosDisponibles(selectedEmpleadoAsignado as Empleado[]);
      }

      // elimino de la lista de asignados los empleados disponibles
      (selectedEmpleadoAsignado as Empleado[]).forEach((element) => {
        nuevoEmpleadosAsignados = nuevoEmpleadosAsignados.filter(
          (item) => item.codigo_empleado !== element.codigo_empleado
        );

        setDatosEmpleadosAsignados(nuevoEmpleadosAsignados);
      });
    } else {
      (toastRef.current as any)?.show({
        severity: "error",
        summary: "Error",
        detail: "No ha seleccionado un empleado asignado de la lista",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    get_empleados(idProyecto);
    console.log("buscando proyecto")
    console.log(idProyecto)
  }, [idProyecto]);

  const handleClickBoleta = async () => {
    const postData:PostBoletaInput = {
      fecha_inicio: fecha_inicio_.split("T")[0],
      proyecto: proyecto_,
      ubicacion: ubicacion_,
      comentarios: comentarios_,
      cantidad_medida: cantidad_medida_,
      unidad_medida: unidad_medida_,
      hora_inicio: hora_inicio_,
      hora_final: hora_final_,
      cerrada: cerrada_,
      codigo_manobra: codigo_manobra_,
      fecha_final: fecha_final_.split("T")[0],
      empleados_asignados: datosEmpleadosAsignados.map((emp) => ({
        codigo_empleado: emp.codigo_empleado??"",
        nombre_completo: emp.nombre_completo,
      })),
    };

    setData({ 
      ...postData, 
      fecha_inicio: fecha_inicio_, 
      fecha_final: fecha_final_ 
    } as PostBoletaInput);


    let validacion = true;

    if ((hora_inicio_ === ":") || (hora_inicio_ === "")) {
      validacion = false;
      (toastRef.current as any)?.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debe introducir una hora de inicio válida HH:MM",
        life: 3000,
      });
    }

    if (cantidad_medida_ <= 0 || cantidad_medida_ > cantidad_mano_obra_) {
      validacion = false;
      (toastRef.current as any)?.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debe introducir una cantidad valida",
        life: 3000,
      });
    }

    if (!datosEmpleadosAsignados || datosEmpleadosAsignados.length === 0) {
      validacion = false;
      (toastRef.current as any)?.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debe tener al menos un empleado asignado",
        life: 3000,
      });
    }

    if (!postData.codigo_manobra) {
      validacion = false;
      (toastRef.current as any)?.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Pendiente definir una actividad",
        life: 3000,
      });
    }

    if (validacion) {
      await crearBoleta(postData)
    };
  }

  const handledClckCancelar = () => {
    navegate.push("/app");
  };


  const sendEmail = () => {

    (toastRef.current as any)?.show({
      severity: "success",
      summary: "Miller CR",
      detail: 'Correo enviado!!',
      life: 3000,
    });

    setVisible2(true)
  }

// const convertirHoraADate = (hora: string) => {
//   const fecha = new Date();
//   const [h, m] = hora.split(":");

//   fecha.setHours(Number(h));
//   fecha.setMinutes(Number(m));
//   fecha.setSeconds(0);

//   return fecha;
// };

  return (
    <div >
      <div className="flex flex-row ">

        <div className="flex flex-1 gap-2">
          <div className="card border-gray-400 border-1 flex flex-col flex-1 ">
            <div>
              {" "}
              <p className="font-bold text-xl text-primary ">
                {" "}
                Empleados disponibles{" "}
              </p>{" "}
            </div>
            <DataTable
              value={datosEmpleadosDisponibles}
              size="small"
              stripedRows
              tableStyle={{ minWidth: "10rem", width: "50%" }}
              selectionMode="multiple"
              onSelectionChange={(e) => fijoEmpleadoDisponible(e.value)}
              dataKey="codigo_empleado"
              selection={selectedEmpleadoDisponible}
              scrollable
              scrollHeight="380px"
            >
              <Column field="codigo_empleado" header="Código"></Column>
              <Column
                field="nombre_completo"
                filter
                filterPlaceholder="Buscar por descripcion"
                sortable
                header="Nombre Completo"
              ></Column>
            </DataTable>
          </div>
          <div className="flex flex-col align-items-center justify-content-center gap-2 my-auto mx-5">
            <Button
              className="w-8rem"
              icon="pi pi-arrow-right"
              iconPos="right"
              label="Asignar"
              onClick={handleClickAsignar}
            />
            <Button
              className="w-8rem "
              icon="pi pi-arrow-left"
              label="Devolver"
              onClick={handleClickDevolver}
            />
          </div>
        </div>


        <div className="flex flex-1 gap-2">
          <div className="card border-gray-400 border-1 flex flex-col  flex-1 ">
            <div>
              {" "}
              <p className="font-bold text-xl text-primary ">
                {" "}
                Empleados asignados
              </p>{" "}
            </div>
            <DataTable
              value={datosEmpleadosAsignados}
              size="small"
              stripedRows
              tableStyle={{ minWidth: "10rem", width: "50%" }}
              selectionMode="multiple"
              onSelectionChange={(e) => fijoEmpleadoAsignado(e.value)}
              dataKey="codigo_empleado"
              selection={selectedEmpleadoAsignado}
              scrollable
              scrollHeight="380px"
            >
              <Column field="codigo_empleado" header="Código"></Column>
              <Column
                field="nombre_completo"
                filter
                filterPlaceholder="Buscar por descripcion"
                sortable
                header="Nombre Completo"
              ></Column>
            </DataTable>
          </div>
          <div className="flex flex-col align-items-center justify-content-center gap-2 my-auto ml-5">
            <Button
              icon=""
              label="Generar Boleta"
              onClick={handleClickBoleta}
            />
            <Button
              icon=""
              label="Cancelar"
              onClick={handledClckCancelar}
            />
          </div>
        </div>
      </div>


      <Toast ref={toastRef} />
      <ConfirmDialog />

      <Dialog
        header="Envio de Boleta por correo"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Correo Electrónico</label>
          <InputText id="email" aria-describedby="correo-help" />
          <small id="correo-help">
            Digite el correo electrónico de la persona a la que desea se envié
            la boleta.
          </small>
          <div className="flex flex-wrap justify-content-center gap-3">
            <Button label="Enviar"

              onClick={sendEmail}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Envio de Boleta por correo"
        visible={visible2}
        style={{ width: 'clamp(50rem, 50rem, 100%)' }}
        onHide={() => {
          if (!visible2) return;
          setVisible2(false);
        }}
      >
        {data && <Boleta user={user} boleta={data} />}
      </Dialog>



    </div>
  );
}

export default TableEmpleados;
