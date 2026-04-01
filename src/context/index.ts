// /store/index.ts
"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userSlice  } from "./userSlice";
import { boletaSlice } from "./boletaSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    boleta: boletaSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
