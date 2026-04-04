"use server";

import { prisma } from "@/lib/prisma";

export async function getBoletaDetail(id_proyecto_: string, estado: boolean) {


  // 1. Traer boletas
  const boletas = await prisma.boleta.findMany({
    where: {
      proyecto: id_proyecto_,
      cerrada: estado,
    },
    orderBy: {
      id: "desc",
    },
  });

  // 2. Mapear con empleados (similar a tu loop)
  const boletaDetail = await Promise.all(
    boletas.map(async (b) => {
      const empleados = await prisma.empleado_boleta.findMany({
        where: {
          id_boleta: b.id,
          fecha_final: null,
        },
        select: {
          codigo_empleado: true,
          // ⚠ aquí necesitamos cruzar con payroll (no hay relación directa en Prisma)
        },
      });

      // ⚠ Como tu schema NO tiene relación directa entre empleado_boleta → empleado
      // hacemos query manual adicional

      const empleadosConNombre = await Promise.all(
        empleados.map(async (emp) => {
          const persona = await prisma.$queryRaw<{ nombre_completo: string }[]>`
            SELECT p.nombre_completo
            FROM payroll.empleado e
            INNER JOIN payroll.persona_empleado pe 
              ON e.idempleado = pe.empleadoes_idempleado
            INNER JOIN payroll.persona p 
              ON pe.persona_idpersona = p.idpersona
            WHERE e.codigo_empleado = ${emp.codigo_empleado}
            LIMIT 1
          `;

          return {
            codigo_empleado: emp.codigo_empleado,
            nombre_completo: persona[0]?.nombre_completo ?? null,
          };
        }),
      );

      return {
        id: b.id,
        fecha_inicio: b.fecha_inicio,
        codigo_manobra: b.codigo_manobra,
        comentarios: b.comentarios,
        cantidad_asignada: `${b.cantidad_medida ?? ""} ${b.unidad_medida ?? ""}`,
        cerrada: b.cerrada,
        empleados: empleadosConNombre,
      };
    }),
  );

  return boletaDetail;
}
