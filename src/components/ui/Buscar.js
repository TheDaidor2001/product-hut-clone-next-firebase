import Style from '../../styles/Header.module.css'


export const Buscar = () => {
  return (
    <form className={Style.formulario}>
        <input type="text" placeholder='Buscar Productos' className={Style.inputText} />

        <button className={Style.botonSubmit} type="submit">Buscar</button>
    </form>
  )
}
