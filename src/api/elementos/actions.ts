"use server";

import { prisma } from "@/lib/prisma";

export const getElemDetail = async (
  presupuesto: string = "",
  sector: string = "",
) => {
  try {
    // 🔹 1. Obtener elementos
    const elementos = await prisma.tb_elementos_sectores.findMany({
      where: {
        presupuesto,
        sector,
      },
      include: {
        tb_unidad_medida: {
          select: {
            descripcion: true,
          },
        },
        tb_presup_manobra: true, // para saber si tiene hijos
      },
    });

    let row_id = 1;

    const result = await Promise.all(
      elementos.map(async (row) => {
        const cod_ele_sec = row.cod_ele_sec;

        // 🔹 2. Obtener actividades (equivalente al segundo query)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actividades = await prisma.$queryRawUnsafe<any[]>(`
          SELECT
            tpm.presupuesto,
            tpm.codigo_manobra,
            tm.actividad,
            tum.descripcion as unidad_medida,
            tpm.cantidad - COALESCE(b.cantidad_medida,0) as cantidad,
            tpm.rendimiento
          FROM tb_presup_manobra tpm
          INNER JOIN tb_manoobra tm 
            ON tpm.codigo_manobra = tm.codigo_manobra
          INNER JOIN tb_unidad_medida tum  
            ON tpm.unidad_medida = tum.cod_unidad_medida
          LEFT JOIN (
            SELECT 
              b.proyecto,
              b.codigo_manobra,
              SUM(b.cantidad_medida) cantidad_medida
            FROM horas.boleta b
            GROUP BY b.proyecto, b.codigo_manobra
          ) b 
          ON tpm.presupuesto = b.proyecto 
          AND tpm.codigo_manobra = b.codigo_manobra
          WHERE tpm.presupuesto = '${presupuesto}'
          AND tpm.cod_ele_sec = '${cod_ele_sec}'
          AND (tpm.cantidad - COALESCE(b.cantidad_medida,0)) > 0
        `);

        const actividadesMap = actividades.map((item) => ({
          ...item,
          codigo_manobra: item.codigo_manobra.toNumber(),
          cantidad: item.cantidad.toNumber(),
          rendimiento: item.rendimiento.toNumber(),
        }));

        return {
          key: row_id++,
          presupuesto,
          cod_ele_sec: row.cod_ele_sec,
          descripcion: row.descripcion,
          comentario: row.comentario,
          unidad_medida: row.tb_unidad_medida?.descripcion,
          cantidad_elemento: row.cantidad_elemento?.toNumber(),
          children: row.tb_presup_manobra.length > 0,
          actividades: actividadesMap,
        };
      }),
    );

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
