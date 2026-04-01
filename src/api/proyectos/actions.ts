"use server";

import { prisma } from "@/lib/prisma";
import { TypeTbPresupuesto } from "@/lib/types";

export const getProyectos = async (): Promise<TypeTbPresupuesto[]> => {
  try {
    const data = await prisma.tb_presupuesto.findMany({
      orderBy: { presupuesto: "desc" },
    });
    return data.map((p) => ({
      ...p,
      // Convert Prisma Decimal to number to match tb_presupuesto_type
      tipo_licitacion: p.tipo_licitacion?.toNumber(),
      area_construccion: p.area_construccion?.toNumber(),
    })) as TypeTbPresupuesto[];
  } catch {
    return [];
  }
};

export const getProyectoByID = async (
  id: string,
): Promise<TypeTbPresupuesto |null > => {
  try {
    const data = await prisma.tb_presupuesto.findUnique({
      where: { presupuesto: id },
    });

    if (data) {
      return {
        ...data,
        // Convert Prisma Decimal to number to match TypeTbPresupuesto
        tipo_licitacion: data.tipo_licitacion?.toNumber(),
        area_construccion: data.area_construccion?.toNumber(),
      } as TypeTbPresupuesto;
    } else {
      return  null
    }
  } catch {
    return null
  }
};
