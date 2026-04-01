// /context/boletaSlice.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Empleado = any; // tipa esto si conoces la forma
type BoletaState = {
  fecha_inicio: string;
  proyecto: string;
  ubicacion: string;
  comentarios: string;
  cantidad_medida: number;
  unidad_medida: string;
  hora_inicio: string;
  hora_final: string;
  cerrada: boolean;
  codigo_manobra: number;
  fecha_final: string;
  empleados_asignados: Empleado[];
};

const procesarInitialState = (): BoletaState => ({
  fecha_inicio: "",
  proyecto: "",
  ubicacion: "",
  comentarios: "",
  cantidad_medida: 0,
  unidad_medida: "",
  hora_inicio: "",
  hora_final: "",
  cerrada: false,
  codigo_manobra: 0,
  fecha_final: "",
  empleados_asignados: [],
});

export const boletaSlice = createSlice({
  name: "boleta",
  initialState: procesarInitialState(), // ← ¡invocar la función!
  reducers: {
    setFechaInicio: (state, action: PayloadAction<string>) => {
      state.fecha_inicio = action.payload;
    },
    setProyecto: (state, action: PayloadAction<string>) => {
      state.proyecto = action.payload;
    },
    setUbicacion: (state, action: PayloadAction<string>) => {
      state.ubicacion = action.payload;
    },
    setComentarios: (state, action: PayloadAction<string>) => {
      state.comentarios = action.payload;
    },
    setCantidadMedida: (state, action: PayloadAction<number>) => {
      state.cantidad_medida = action.payload;
    },
    setUnidadMedida: (state, action: PayloadAction<string>) => {
      state.unidad_medida = action.payload;
    },
    setHoraInicio: (state, action: PayloadAction<string>) => {
      state.hora_inicio = action.payload;
    },
    setHoraFinal: (state, action: PayloadAction<string>) => {
      state.hora_final = action.payload;
    },
    setCerrada: (state, action: PayloadAction<boolean>) => {
      state.cerrada = action.payload;
    },
    setCodigoManobra: (state, action: PayloadAction<number>) => {
      state.codigo_manobra = action.payload;
    },
    setFechaFinal: (state, action: PayloadAction<string>) => {
      state.fecha_final = action.payload;
    },
    setEmpleadosAsignados: (state, action: PayloadAction<Empleado[]>) => {
      state.empleados_asignados = action.payload;
    },
  },
});

export const {
  setFechaInicio,
  setProyecto,
  setUbicacion,
  setComentarios,
  setCantidadMedida,
  setUnidadMedida,
  setHoraInicio,
  setHoraFinal,
  setCerrada,
  setCodigoManobra,
  setFechaFinal,
  setEmpleadosAsignados,
} = boletaSlice.actions;
