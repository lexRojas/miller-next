import React, { useRef } from "react";
import "@/styles/boleta.css";
import { converPDF } from "../tools/converPDF";

const Boleta = (props) => {
  const { user, boleta } = props;


  const report = useRef()

  const genPDF = () => {

    converPDF(report)


  }



  return (
    <div>
      <div ref={report}>
        <div>
          <h3>
            PROYECTO: {boleta.proyecto} - {user.desc_proyecto}{" "}
          </h3>
          <span>Detalle de Boleta de Asignacion</span>
        </div>
        <hr />
        <div className="cuerpo_boleta">
          <div className="item-texto">
            <p className="label">Actividad</p>
            <p>{boleta.comentarios} </p>
          </div>
          <div className="item-texto">
            <p className="label">Fecha Inicio</p>
            <p>{boleta.fecha_inicio}</p>
          </div>
          <div className="item-texto">
            <p className="label">Hora Inicio</p>
            <p>{boleta.hora_inicio}</p>
          </div>
        </div>
        <hr />
        <div className="lista-empleados">
          <h5>Empleados Asignados</h5>
          <hr />

          <table className="blueTable">
            <thead>
              <th> Codigo Planilla </th>
              <th> Nombre Completo </th>
            </thead>
            <tbody>
              {boleta.empleados_asignados.map((empleados) => (
                <tr key={empleados.codigo_empleado}>
                  <td> {empleados.codigo_empleado} </td>
                  <td> {empleados.nombre_completo} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel">
        <button onClick={genPDF}>
          Exportar PDF
        </button>

      </div>


    </div>
  );
};

export default Boleta;
