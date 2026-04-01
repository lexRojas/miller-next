type ModeloInteres = "ALEMAN" | "FRANCES";

interface CalcularProximaCuotaInput {
  plazoTotal: number; // total de cuotas del préstamo
  plazoRestante: number; // número de cuotas restantes
  porcentajeInteresOrdinario: number; // % mensual
  porcentajeInteresMoratorio: number; // % mensual sobre saldo por día de atraso
  saldoActual: number;
  fechaProyectadaPago: string; // "YYYY-MM-DD"
  fechaReal: string; // "YYYY-MM-DD"
  modeloInteres: ModeloInteres;
}

interface ProximaCuotaOutput {
  montoAmortizacionCapital: number;
  montoInteresOrdinario: number;
  montoInteresMoratorio: number;
}

export async function calcularProximaCuota(
  input: CalcularProximaCuotaInput
): Promise<ProximaCuotaOutput> {
  const {
    plazoRestante,
    porcentajeInteresOrdinario,
    porcentajeInteresMoratorio,
    saldoActual,
    fechaProyectadaPago,
    fechaReal,
    modeloInteres,
  } = input;

  // 1️⃣ Convertir fechas a Date
  const fechaProy = new Date(fechaProyectadaPago + "T00:00:00");
  const fechaAct = new Date(fechaReal + "T00:00:00");

  // 2️⃣ Calcular días de atraso
  const diasAtraso = Math.max(
    0,
    Math.ceil(
      (fechaAct.getTime() - fechaProy.getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  let montoAmortizacionCapital = 0;
  let montoInteresOrdinario = 0;
  let montoInteresMoratorio = 0;

  // Interés moratorio
  montoInteresMoratorio =
    saldoActual * (porcentajeInteresMoratorio / 100) * diasAtraso;

  if (modeloInteres === "ALEMAN") {
    // 3️⃣ Sistema Alemán: capital constante ajustado al saldo actual
    montoAmortizacionCapital = saldoActual / plazoRestante;
    montoInteresOrdinario = saldoActual * (porcentajeInteresOrdinario / 100);
  } else if (modeloInteres === "FRANCES") {
    // 4️⃣ Sistema Francés: cuota total constante basada en saldo actual y plazo restante
    const i = porcentajeInteresOrdinario / 100; // tasa mensual
    const n = plazoRestante;

    // cuota total mensual según fórmula francesa
    const cuotaTotal =
      (saldoActual * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);

    montoInteresOrdinario = saldoActual * i;
    montoAmortizacionCapital = cuotaTotal - montoInteresOrdinario;
  }

  // 5️⃣ Redondeo a 2 decimales
  return {
    montoAmortizacionCapital: Math.round(montoAmortizacionCapital * 100) / 100,
    montoInteresOrdinario: Math.round(montoInteresOrdinario * 100) / 100,
    montoInteresMoratorio: Math.round(montoInteresMoratorio * 100) / 100,
  };
}
