"use server";

import { prisma } from "@/lib/prisma"; // ajusta la ruta según tu proyecto



export async function getEmpleados(presupuesto: number | string = 0) {
  try {
    // 1. Obtener empleados excluidos (subquery)
    const empleadosExcluidos = await prisma.empleado_boleta.findMany({
      where: {
        fecha_final: null,
      },
      select: {
        codigo_empleado: true,
      },
    });

    const codigosExcluidos = empleadosExcluidos.map((e) => e.codigo_empleado);

    // 2. Query principal
    const empleados = await prisma.empleado.findMany({
      where: {
        fecha_salida: null,
        funcion: "C-Campo",
        proyecto_presupuesto: Number(presupuesto),
        codigo_empleado: {
          notIn: codigosExcluidos,
        },
      },
      include: {
        persona: true, // relación con persona
      },
    });

   

     // 3. Transformar resultado (equivalente a CONCAT en SQL)
    const result = empleados.map((e) => {
      const p = e.persona;

      const nombreCompleto = [
        p?.nombre1?.trim(),
        p?.nombre2?.trim(),
        p?.apellido1,
        p?.apellido2,
      ]
        .filter(Boolean)
        .join(" ");

      return {
        codigo_empleado: e.codigo_empleado,
        nombre_completo: nombreCompleto,
        nombre_codigo: `${e.codigo_empleado}-${nombreCompleto}`,
      };
    });

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}



export type AddBoletaEmpleadoInput = {
  id_boleta: number
  codigo_empleado: string
  fecha_inicio: string
  hora_inicio: string
}

export async function addBoletaEmpleadoBoleta(
  valores: AddBoletaEmpleadoInput
) {
  try {
    // Convertir a formato string (como en tu DB)
    const strFecha = valores.fecha_inicio
    const strHora = valores.hora_inicio

    await prisma.empleado_boleta.create({
      data: {
        id_boleta: valores.id_boleta,
        codigo_empleado: valores.codigo_empleado,
        fecha_inicio: strFecha,
        hora_inicio: strHora,
      },
    })

    return { resultado: true }
  } catch (error) {
    console.error(error)
    return { resultado: false }
  }
}