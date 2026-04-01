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
  } finally {
    await prisma.$disconnect();
  }
};
