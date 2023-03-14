import Styles from "../../styles/Producto.module.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";

export const DetallesProducto = ({ producto }) => {
  const {
    id,
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    URLImage,
    votos,
  } = producto;
  return (
    <li className={Styles.producto}>
      <div className={Styles.descipcionProducto}>
        <div>
          <img className={Styles.imagen} src={URLImage} alt="Imagen" />
        </div>
        <div>
          <Link href="/productos/[id]" as={`/productos/${id}`} className={Styles.titulo}>{nombre}</Link>
          <p className={Styles.descripcion}>{descripcion}</p>
          <div className={Styles.comentarios}>
            <div>
              <img src="/img/comentario.png" alt="Comentario" />
              <p>{comentarios.length} Comentarios</p>
            </div>
          </div>
          <p>
            Publicado hace:{" "}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </p>
        </div>
      </div>
      <div className={Styles.votos}>
        <div>&#9650;</div>
        <p>{votos}</p>
      </div>
    </li>
  );
};
