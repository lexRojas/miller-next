// ================== HORAS ==================

export type TypeBoleta = {
  id: number
  fecha_inicio?: string | null
  proyecto?: string | null
  ubicacion?: string | null
  comentarios?: string | null
  cantidad_medida?: number | null
  unidad_medida?: string | null
  hora_inicio?: string | null
  hora_final?: string | null
  cerrada?: boolean | null
  codigo_manobra?: number | null
  fecha_final?: string | null
}

export type TypeEmpleadoBoleta = {
  id: number
  id_boleta: number
  codigo_empleado: string
  fecha_inicio?: string | null
  hora_inicio?: string | null
  fecha_final?: string | null
  hora_final?: string | null
}

export type TypeHorasUsuario = {
  login: string
  nombre: string
  password: string
  fecha_cambio: Date
  fecha_vencimiento: Date
  activo: boolean
}

export type TypeUsuario = {
  id: number
  name: string
  login: string
  password: string
  perfil: string
}

// ================== PAYROLL ==================

export type TypeEmpleado = {
  idempleado: number
  activo: boolean
  codigo_empleado?: string | null
  cuenta_bancaria?: string | null
  desempeno?: string | null
  fecha_exclusion?: Date | null
  fecha_inclusion?: Date | null
  fecha_ingreso?: Date | null
  fecha_salida?: Date | null
  fecha_salida_esperada?: Date | null
  forma_de_pago?: number | null
  funcion?: string | null
  numero_transaccion?: string | null
  salario: number
  tipo_contrato?: string | null
  tipo_cuenta?: number | null
  banco_idbanco?: number | null
  persona_idpersona?: number | null
  poliza_numero_poliza?: string | null
  proyecto_presupuesto?: number | null
  puesto_idpuesto?: number | null
  terminacion_idterminacion?: number | null

  // relaciones
  proyecto?: TypeProyecto | null
  puesto?: TypePuesto | null
  persona?: TypePersona | null
  persona_empleado?: TypePersonaEmpleado | null
}

export type TypePersona = {
  idpersona: number
  apellido1?: string | null
  apellido2?: string | null
  condicion?: string | null
  direccion?: string | null
  fecha_nacimiento?: Date | null
  genero?: string | null
  nombre1?: string | null
  nombre2?: string | null
  nombre_completo?: string | null
  telefono?: string | null
  tipoasegurado?: number | null
  estado_civil_idestado_civil1?: number | null
  nacionalidad_id_nacionalidad?: number | null

  // relaciones
  empleado?: TypeEmpleado[]
  persona_empleado?: TypePersonaEmpleado[]
}

export type TypePersonaEmpleado = {
  persona_idpersona: number
  empleadoes_idempleado: number

  persona?: TypePersona
  empleado?: TypeEmpleado
}

export type TypeProyecto = {
  presupuesto: number
  proyecto?: string | null

  empleado?: TypeEmpleado[]
}

export type TypePuesto = {
  idpuesto: number
  descripcion?: string | null
  estado?: boolean | null

  empleado?: TypeEmpleado[]
}

// ================== PUBLIC ==================

export type TypeTbUnidadMedida = {
  cod_unidad_medida: number
  descripcion?: string | null
  fecha_cambio?: Date | null
  cod_usuario?: string | null
  descrip_larga?: string | null
}

export type TypeTbElementos = {
  codigo_elemento: number
  descripcion?: string | null
  fecha_cambio?: Date | null
  cod_usuario?: string | null
  unidad_medida?: number | null

  tb_unidad_medida?: TypeTbUnidadMedida | null
  tb_elementos_sectores?: TypeTbElementosSectores[]
}

export type TypeTbElementosSectores = {
  presupuesto: string
  cod_ele_sec: string
  elemento?: number | null
  sector?: string | null
  descripcion?: string | null
  comentario?: string | null
  cantidad_elemento?: number | null
  fecha_cambio?: Date | null
  cod_usuario?: string | null
  unidad_medida?: number | null
  consecutivo?: number | null

  tb_elementos?: TypeTbElementos | null
  tb_presupuesto?: TypeTbPresupuesto
  tb_unidad_medida?: TypeTbUnidadMedida | null
  tb_presup_manobra?: TypeTbPresupManobra[]
}

export type TypeTbManoObra = {
  codigo_manobra: number
  actividad?: string | null
  rendimiento?: number | null
  puesto?: string | null
  cod_usuario?: string | null
  fecha_cambio?: Date | null
  unidad_medida?: number | null

  tb_unidad_medida?: TypeTbUnidadMedida | null
  tb_presup_manobra?: TypeTbPresupManobra[]
}

export type TypeTbPresupManobra = {
  presupuesto: string
  codigo_manobra: number
  cod_ele_sec: string

  cantidad?: number | null
  rendimiento?: number | null
  cant_hht?: number | null
  costo_hh?: number | null
  costo_hht?: number | null
  fecha_cambio?: Date | null
  cod_usuario?: string | null
  unidad_medida?: number | null

  tb_manoobra?: TypeTbManoObra
  tb_unidad_medida?: TypeTbUnidadMedida | null
  tb_elementos_sectores?: TypeTbElementosSectores
}

export type TypeTbPresupuesto = {
  presupuesto: string
  proyecto?: string | null
  propietario?: string | null
  fecha_apertura?: Date | null
  hora_apertura?: string | null
  area_construccion?: number | null
  fecha_cambio?: Date | null
  cod_usuario?: string | null
  tipo_licitacion?: number | null
  responsable?: number | null
  num_licitacion?: string | null
  activo?: boolean | null

  tb_elementos_sectores?: TypeTbElementosSectores[]
}

export type TypeTbPresupuestoC = {
  presupuesto: string
  proyecto: string
  propietario: string
  fecha_apertura: Date
  hora_apertura: string
  area_construccion: number
  fecha_cambio: Date
  cod_usuario: string
  tipo_licitacion: number
  responsable: number
  num_licitacion: string
  activo: boolean
}

export type TypeTbSectoresProyectos = {
  codigo_sector: string
  presupuesto: string
  fecha_cambio?: Date | null
  cod_usuario?: string | null
  descripcion?: string | null
}