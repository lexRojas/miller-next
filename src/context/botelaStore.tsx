import { create } from 'zustand'

// creo el tipo de datos de mi tienda 
type variableEntornoType = {
    idProyecto: string
    descripcionProyecto: string
    idSector: string
}


//creo los componentes de mi tienda 
type Store = {
    variablesEntorno: variableEntornoType
    setProyecto: (idProyecto: string, descripcionProyecto: string) => void
    setSector: (idSector: string) => void
}

export const useBoletaStore = create<Store>((set) => ({
    variablesEntorno: {
        idProyecto:  "",
        descripcionProyecto:  "",
        idSector:  "",
    },

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
}));
