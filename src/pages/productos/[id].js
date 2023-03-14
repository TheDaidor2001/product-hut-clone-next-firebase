import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../../firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage"
import { Layout } from "@/components/layouts/Layout";
import { ErrorPage } from "@/components/layouts/ErrorPage";
import Styles from "../../styles/Producto.module.css";
import Formulario from "../../styles/Formularios.module.css";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { CreadorProducto } from "@/components/ui/CreadorProducto";

const Producto = () => {
  //State del componete
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const [comentario, guardarComentario] = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);

  //Rounting para obtener el ID actual
  const router = useRouter();
  //console.log(router.query.id);
  const {
    query: { id },
  } = router;

  //Context de Firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerProducto = async () => {
        const productoQuery = await doc(
          collection(firebase.db, "productos"),
          id
        );
        const productoID = await getDoc(productoQuery);
        //console.log(productoID.data());
        if (productoID.exists) {
          setProducto(productoID.data());
          guardarConsultarDB(false);
        } else {
          setError(true);
          guardarConsultarDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    URLImage,
    votos,
    creador,
    haVotado,
  } = producto;

  //Administrar y validar los votos

  const votarProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }

    //Obtener y sumar un nuevo voto

    const nuevoTotal = votos + 1;

    //verificar si el usuario actual ya voto en este producto
    if (haVotado.includes(usuario.uid)) return;

    //guardar el ID del usuario que a votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    //Actualizar en la base de datos
    const docRef = doc(firebase.db, "productos", `${id}`);

    updateDoc(docRef, {
      votos: increment(nuevoTotal),
      haVotado: nuevoHaVotado,
    });

    //Actualizar el State
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });
    guardarConsultarDB(true);
  };

  //funciones para crear comentarios
  const comentarioChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  //identifica si el comentario es del creador
  const esCreador = (id) => {
    if (creado.id === id) {
      return true;
    }
  };

  const agregarComentario = (e) => {
    e.preventDefault();
    if (!usuario) return router.push("/login");

    //informacion extra al comentario
    comentario.usarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    //Tomar copia de comentario y agregarlos al arreglo

    const nuevosComentarios = [...comentarios, comentario];

    //Actualizar la BD
    const docRef = doc(firebase.db, "productos", `${id}`);
    updateDoc(docRef, {
      comentarios: nuevosComentarios,
    });

    //Actualizar el State
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });
    guardarConsultarDB(true);
  };

  //Funcion que revisa al creador
  const puedeBorrar = () => {
    if(!usuario) return false;

    if(creador.id === usuario.uid) return true
  }

  //eliminar producto de la BD
  const eliminarProducto = async () => {
    if(!usuario) return router.push('/login')
    if(creador.id === usuario.uid) return router.push('/')
    try {
      await deleteDoc(doc(firebase.db, "productos", id))
      const storage = getStorage()
      const imgRef = ref(storage, URLImage)
      deleteObject(imgRef).then(() => {
        // Imagen eliminada correctamente
      }) .catch((error) => {
        console.log(error)
      })
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      {error ? (
        <ErrorPage />
      ) : (
        <div className="contenedor">
          <h1 className={Styles.textoProducto}>{nombre}</h1>
          <div className={Styles.contenedorProducto}>
            <div>
              <p>
                Publicado hace:{" "}
                {formatDistanceToNow(new Date(creado), { locale: es })}
              </p>
              <p>
                Por: {creador?.nombre} de {empresa}
              </p>
              <img src={URLImage} alt="imagen" />
              <p>{descripcion}</p>

              {usuario && (
                <>
                  <h2>Agrega tu comentario</h2>
                  <form onSubmit={agregarComentario}>
                    <div className={Formulario.campo}>
                      <input
                        type="text"
                        name="mensaje"
                        onChange={comentarioChange}
                      />
                    </div>
                    <input
                      className={Formulario.inputSubmit}
                      type="submit"
                      value="Comentar"
                    />
                  </form>
                </>
              )}
              <h2 className={Styles.comentario2}>Comentarios</h2>
              {comentarios.length === 0 ? (
                "Aún no hay comentarios"
              ) : (
                <ul>
                  {comentarios.map((comentario, i) => (
                    <li key={`${usuario.id}-${i}`} className={Styles.lista}>
                      <p>{comentario.mensaje}</p>
                      <p>
                        Escrito por: <span>{comentario.usuarioNombre}</span>
                      </p>
                      {esCreador(comentario.usuarioId) && <CreadorProducto />}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <aside>
              <a target="_blank" className="boton bg1" href={url}>
                Visitar URL
              </a>
              <div className={Styles.votar}>
                {usuario && (
                  <a className="boton bg2" onClick={votarProducto}>
                    Votar
                  </a>
                )}
                <p>{votos} votos</p>
              </div>
            </aside>
          </div>
          { puedeBorrar() &&  <input type="button" value="Eliminar producto" className="boton bg-2" onClick={eliminarProducto}/>}
        </div>
      )}
    </Layout>
  );
};

export default Producto;
