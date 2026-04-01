// /context/userSlice.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Actividad {
  codigo_manobra:  number;
  actividad: string;
  unidad_medida: string ;
  cantidad: number;
}

type UserState = {
  id_proyecto: string;
  desc_proyecto: string;
  usuario: string;
  id_sector: string;
  actividad: Actividad;
};

const initialActividad: Actividad = {
  codigo_manobra: 0,
  actividad: "",
  unidad_medida: "",
  cantidad: 0,
};

const procesarInitialState = (): UserState => ({
  id_proyecto: "",
  desc_proyecto: "",
  usuario: "",
  id_sector: "",
  actividad: initialActividad,
});

export const userSlice = createSlice({
  name: "user",
  initialState: procesarInitialState(), // ← invocar
  reducers: {
    SET_ID_PROYECTO: (
      state,
      action: PayloadAction<{ id: string; descripcion: string }>,
    ) => {
      state.id_proyecto = action.payload.id;
      state.desc_proyecto = action.payload.descripcion;
    },
    SET_ID_SECTORES: (state, action: PayloadAction<string>) => {
      state.id_sector = action.payload;
    },
    setIdUser: (state, action: PayloadAction<string>) => {
      state.usuario = action.payload;
    },
    SET_ACTIVIDAD: (state, action: PayloadAction<Actividad>) => {
      state.actividad = action.payload;
    },
  },
});

export const { SET_ID_PROYECTO, SET_ID_SECTORES, setIdUser, SET_ACTIVIDAD } =
  userSlice.actions;
