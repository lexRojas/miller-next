"use server";

import { prisma } from "@/lib/prisma";

type EmpleadoAsignado = {
  codigo_empleado: string;
};

export type BoletaInput = {
  fecha_inicio: string;
  proyecto: string;
  ubicacion: string;
  comentarios?: string;
  cantidad_medida: number;
  unidad_medida: string;
  hora_inicio: string; // o Date según tu schema
  hora_final: string;
  cerrada: boolean;
  codigo_manobra: number;
  fecha_final?: string;
  empleados_asignados?: EmpleadoAsignado[];
};

// utils/serialize.ts

export async function crearBoleta(data: BoletaInput) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Insertar boleta
      const nuevaBoleta = await tx.boleta.create({
        data: {
          fecha_inicio: data.fecha_inicio,
          proyecto: data.proyecto,
          ubicacion: data.ubicacion,
          comentarios: data.comentarios,
          cantidad_medida: data.cantidad_medida,
          unidad_medida: data.unidad_medida,
          hora_inicio: data.hora_inicio,
          hora_final: data.hora_final,
          cerrada: data.cerrada,
          codigo_manobra: data.codigo_manobra,
          fecha_final: data.fecha_final,
        },
      });

      // 2. Insertar empleados (si existen)
      if (data.empleados_asignados && data.empleados_asignados.length > 0) {
        await tx.empleado_boleta.createMany({
          data: data.empleados_asignados.map(
            (emp: { codigo_empleado: string }) => ({
              id_boleta: nuevaBoleta.id,
              codigo_empleado: emp.codigo_empleado,
              fecha_inicio: data.fecha_inicio,
              hora_inicio: data.hora_inicio,
            }),
          ),
        });
      }

      return nuevaBoleta;
    });

    return {
      message: "Data inserted successfully",
      boleta: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error inserting data",
    };
  }
}

export type CerrarBoletaInput = {
  id_boleta: number;
  codigo_empleado: string;
  fecha_final: string;
  hora_final: string;
};

export async function cerrarBoletas(valores: CerrarBoletaInput) {
  try {
    // Convertir fecha y hora al formato que usa tu DB (string)
    const strFecha = valores.fecha_final;
    const strHora = valores.hora_final;

    console.log("parametros de cerrar boleta -->", valores);

    await prisma.empleado_boleta.updateMany({
      where: {
        id_boleta: valores.id_boleta,
        codigo_empleado: valores.codigo_empleado,
      },
      data: {
        fecha_final: strFecha,
        hora_final: strHora,
      },
    });

    return { resultado: true };
  } catch (error) {
    console.error(error);
    return { resultado: false };
  }
}

//**
/* Cierra las boletas a partir de id de boleta de los empleados que aun esten con cierre pendiente
 * @param valores
 * @returns
 **/
export async function cerrarBoletasByID(valores: CerrarBoletaInput) {
  try {
    // Convertir fecha y hora al formato que usa tu DB (string)
    const strFecha = valores.fecha_final;
    const strHora = valores.hora_final;

    console.log("parametros de cerrar boleta -->", valores);

    await prisma.empleado_boleta.updateMany({
      where: {
        id_boleta: valores.id_boleta,
        fecha_final: null,
      },
      data: {
        fecha_final: strFecha,
        hora_final: strHora,
      },
    });

    await prisma.boleta.updateMany({
      where: {
        id: valores.id_boleta,
      },
      data: {
        cerrada: true,
      },
    });

    return { resultado: true };
  } catch (error) {
    console.error(error);
    return { resultado: false };
  }
}
