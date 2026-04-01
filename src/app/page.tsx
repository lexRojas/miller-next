'use client'


import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIdUser } from "../context/userSlice";


import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";


export default function Login() {
  const [value, setValue] = useState("");


  const dispatch = useDispatch();


  const navegate = useRouter();


  function clickHandleIngresar(e: { preventDefault: () => void; }) {
    e.preventDefault();
    dispatch(setIdUser('Valido'))
    navegate.push('/home')
  }

  return (
    <div className="container mx-auto relative top-7    col-12 md:col-5 card">
      <div className="col  ">
        <p className="text-center text-xl font-bold ">
          Sistema de Control de Horas Version 1.65
        </p>
      </div>

      <div className="flex flex-column gap-2">
        <label htmlFor="username">Correo Electrónico</label>
        <InputText id="username" aria-describedby="username-help" />
        <small id="username-help">
          Digite su correo electrónico registrado en el sistema.
        </small>
      </div>

      <div className="flex flex-column pt-3 gap-2 ">
        <label htmlFor="clave">Clave de Acceso</label>
        <Password
          id="clave"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          toggleMask
          className="" />{" "}
      </div>
      <Divider />
      <div className="flex flex-row flex-wrap  items-align-center justify-content-center pt-3 gap-2 ">
        <Button label="Ingresar"
          icon="pi pi-check"
          onClick={clickHandleIngresar} />
        <Button label="Salir" icon="pi pi-power-off" />
      </div>
    </div>
  );
}
