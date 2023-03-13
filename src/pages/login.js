import { Layout } from "@/components/layouts/Layout";
import Style from "../styles/Formularios.module.css";
import Router from "next/router";
import firebase from "../../firebase";

//validaciones

import { useValidacion } from "@/hooks/useValidacion";
import validarIniciarSesion from "@/validacion/validarIniciarSesion";
import { useState } from "react";

const STATE_INICIAL = {
  email: "",
  password: "",
};


export default function Login() {

  const [error, guardarError] = useState(false)

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

    const {email, password} = valores

  async function iniciarSesion() {
    try {
     const usuario = await firebase.login(email, password)

     console.log(usuario);
      Router.push('/')
    } catch (e) {
      console.error('Hubo un error al autenticar el usuario', e.message);
      guardarError(e.message)
    }
  }
  return (
    <div>
      <Layout>
        <>
          <h1 className="mainText">Iniciar Sesión</h1>
          <form className={Style.formulario} onSubmit={handleSubmit} noValidate>
            <div className={Style.campo}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tú Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {errores.email && <p className={Style.error}>{errores.email}</p>}


            <div className={Style.campo}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Tú Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {errores.password && <p className={Style.error}>{errores.password}</p>}

            {error && <p>{error}</p>}
            <input
              className={Style.inputSubmit}
              type="submit"
              value="Iniciar Sesión"
            />
          </form>
        </>
      </Layout>
    </div>
  );
}
