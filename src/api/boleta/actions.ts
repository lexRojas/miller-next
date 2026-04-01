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
  const dataSerial = serializePrisma(data);
  console.log(dataSerial);

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Insertar boleta
      const nuevaBoleta = await tx.boleta.create({
        data: {
          fecha_inicio: data.fecha_inicio,
          proyecto: dataSerial.proyecto,
          ubicacion: dataSerial.ubicacion,
          comentarios: dataSerial.comentarios,
          cantidad_medida: dataSerial.cantidad_medida,
          unidad_medida: dataSerial.unidad_medida,
          hora_inicio: dataSerial.hora_inicio,
          hora_final: dataSerial.hora_final,
          cerrada: dataSerial.cerrada,
          codigo_manobra: dataSerial.codigo_manobra,
          fecha_final: data.fecha_final,
        },
      });

      // 2. Insertar empleados (si existen)
      if (
        dataSerial.empleados_asignados &&
        dataSerial.empleados_asignados.length > 0
      ) {
        await tx.empleado_boleta.createMany({
          data: dataSerial.empleados_asignados.map(
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
