import Link from "next/link"
import Style from '../../styles/Header.module.css'


export const Nav = () => {
  return (
    <nav className={Style.nav}>
        <Link href="/">Inicio</Link>
        <Link href="/populares">Populares</Link>
        <Link href="/nuevo-producto">Nuevo Producto</Link>
    </nav>
  )
}
