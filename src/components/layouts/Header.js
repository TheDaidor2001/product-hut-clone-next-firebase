import Link from "next/link";
import { Buscar } from "../ui/Buscar";
import { Nav } from "./Nav";
import { FirebaseContext } from "../../../firebase";

import Styles from "../../styles/Header.module.css";
import { useContext } from "react";

export const Header = () => {
  const {usuario, firebase} = useContext(FirebaseContext);

  return (
    <header className={Styles.header}>
      <div className={Styles.contenedorHeader}>
        <div className={Styles.wrapper}>
          <Link href="/">
            <p className={Styles.logo}>P</p>
          </Link>

          <Buscar />

          <Nav />
        </div>

        <div className={Styles.wrap}>
          {usuario ? (
            <>
              <p className={Styles.parrafo}>Hola: {usuario?.displayName}</p>

              <button className="boton bg1" type="button" onClick={() => firebase.cerrarSesion()}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="boton bg1">Iniciar Sesión</button>
              </Link>
              <Link href="/crear-cuenta">
                <button className="boton bg2">Crear Cuenta</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
