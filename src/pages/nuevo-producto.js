import { Layout } from "@/components/layouts/Layout";
import Style from "../styles/Formularios.module.css";
import Router from "next/router";
import firebase from "../../firebase";

//validaciones

import { useValidacion } from "@/hooks/useValidacion";
import validarCrearCuenta from "@/validacion/validarCrearCuenta";
import { useState } from "react";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: '',
  descripcion: ''
};

export default function NuevoProducto() {
  const [error, guardarError] = useState(false);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  async function crearCuenta() {
   
  }
  return (
    <div>
      <Layout>
        <>
          <h1 className="mainText">Nuevo Producto</h1>
          <form className={Style.formulario} onSubmit={handleSubmit} noValidate>
            <fieldset className={Style.legenda}>
              <legend>Información General</legend>
              <div className={Style.campo}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Tú Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errores.nombre && (
                <p className={Style.error}>{errores.empresa}</p>
              )}
              <div className={Style.campo}>
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  placeholder="Tú empresa o compañia"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errores.empresa && (
                <p className={Style.error}>{errores.empresa}</p>
              )}

              <div className={Style.campo}>
                <label htmlFor="imagen">Imagen</label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  value={imagen}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errores.imagen && (
                <p className={Style.error}>{errores.imagen}</p>
              )}

              <div className={Style.campo}>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errores.url && <p className={Style.error}>{errores.url}</p>}
            </fieldset>
            <fieldset className={Style.legenda}>
              <legend>Sobre tu producto</legend>

              <div className={Style.campo}>
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                  className={Style.area}
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {errores.descripcion && <p className={Style.error}>{errores.descripcion}</p>}
            </fieldset>

            {error && <p>{error}</p>}
            <input
              className={Style.inputSubmit}
              type="submit"
              value="Crear Producto"
            />
          </form>
        </>
      </Layout>
    </div>
  );
}
