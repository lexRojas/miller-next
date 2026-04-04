import { create } from 'zustand'

// creo el tipo de datos de mi tienda 
type variableEntornoType = {
    idProyecto: string
    descripcionProyecto: string
    idSector: string
}




export type typeActividad = {
    presupuesto: string;
    codigo_manobra: number;
    actividad: string;
    unidad_medida: string;
    cantidad_total: number;
    rendimiento: number;
    cantidad_digitada: number;
    fecha_inicio: string;
    fecha_final: string;
    cerrada: boolean;
    hora_inicio: string;
    hora_final: string;
    ubicacionPlanos: string;
    descripcion: string;
};




//creo los componentes de mi tienda 
type Store = {
    variablesEntorno: variableEntornoType
    variablesBoleta: typeActividad
    user: string
    setProyecto: (idProyecto: string, descripcionProyecto: string) => void
    setSector: (idSector: string) => void
    setDatosBoleta: (data: Partial<typeActividad>) => void
    setUser: (user: string) => void
}

export const useBoletaStore = create<Store>((set) => ({

    user: "",

    variablesEntorno: {
        idProyecto: "",
        descripcionProyecto: "",
        idSector: "",
    },

    variablesBoleta: {
        presupuesto: "",
        codigo_manobra: 0,
        actividad: "",
        unidad_medida: "",
        cantidad_total: 0,
        rendimiento: 0,
        cantidad_digitada: 0,
        fecha_inicio: "",
        fecha_final: "",
        cerrada: false,
        hora_inicio: "",
        hora_final: "17:00",
        ubicacionPlanos: "",
        descripcion: ""
    },

    setUser: (user) =>
        set(() => ({
            user: user
        })),

    setProyecto: (idProyecto, descripcionProyecto) =>
        set((state) => ({
            variablesEntorno: {
                ...state.variablesEntorno,
                idProyecto,
                descripcionProyecto
            }
        })),

    setSector: (idSector) =>
        set((state) => ({
            variablesEntorno: {
                ...state.variablesEntorno,
                idSector,
            }
        })),
    setDatosBoleta: (data) =>
        set((state) => ({
            variablesBoleta: {
                ...state.variablesBoleta,
                ...data,
            },
        })),

}));
