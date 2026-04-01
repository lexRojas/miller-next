"use server";

import { prisma } from "@/lib/prisma";
import { TypeTbSectoresProyectos } from "@/lib/types";

export const getSectores = async (
  idProyecto: string,
): Promise<TypeTbSectoresProyectos[]> => {
  try {
    const data: TypeTbSectoresProyectos[] =
      await prisma.tb_sectores_proyectos.findMany({
        where: { presupuesto: idProyecto },
      });

    return data;
  } catch {
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
