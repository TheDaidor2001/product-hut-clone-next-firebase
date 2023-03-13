import Link from "next/link"
import Style from '../../styles/Header.module.css'
import { FirebaseContext } from "../../../firebase"
import { useContext } from "react"


export const Nav = () => {
  const {usuario} = useContext(FirebaseContext)
  return (
    <nav className={Style.nav}>
        <Link href="/">Inicio</Link>
        <Link href="/populares">Populares</Link>
        {usuario && <Link href="/nuevo-producto">Nuevo Producto</Link>}
    </nav>
  )
}
