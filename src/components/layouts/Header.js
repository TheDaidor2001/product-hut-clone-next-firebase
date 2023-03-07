import Link from "next/link";
import { Buscar } from "../ui/Buscar";
import { Nav } from "./Nav";

import Styles from "../../styles/Header.module.css";

export const Header = () => {
  const user = false;

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
          {user ? (
            <>
              <p className={Styles.parrafo}>Hola: Daniel</p>

              <button className="boton bg1" type="button">
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
