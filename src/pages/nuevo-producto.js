import { Layout } from "@/components/layouts/Layout";
import Style from "../styles/Formularios.module.css";
import Router, { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";

//validaciones

import { useValidacion } from "@/hooks/useValidacion";
import validarCrearProducto from "@/validacion/validarCrearProducto";
import { ErrorPage } from "@/components/layouts/ErrorPage";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  //imagen: "",
  url: "",
  descripcion: "",
};

export default function NuevoProducto() {
  const [error, guardarError] = useState(false);

  // States para la subida de la imagen
  const [uploading, setUploading] = useState(false);
  const [URLImage, setURLImage] = useState("");

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  //context con el crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  const router = useRouter();

  async function crearProducto() {
    //si no esta autenticado
    if (!usuario) {
      return router.push("/login");
    }

    //crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      URLImage,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: [],
    };

    //insertarlo en la base de datos
    try {
      await addDoc(collection(firebase.db, "productos"), producto);

      return router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  const handleImageUpload = (e) => {
    // Se obtiene referencia de la ubicación donde se guardará la imagen
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage, "products/" + file.name);

    // Se inicia la subida
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on(
      "state_changed",
      // Muestra progreso de la subida
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Subiendo imagen: ${progress}% terminado`);
      },
      // En caso de error
      (error) => {
        setUploading(false);
        console.error(error);
      },
      // Subida finalizada correctamente
      () => {
        setUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("Imagen disponible en:", url);
          setURLImage(url);
        });
      }
    );
  };

  return (
    <div>
      <Layout>
        {!usuario ? (
          <ErrorPage />
        ) : (
          <>
            <h1 className="mainText">Nuevo Producto</h1>
            <form
              className={Style.formulario}
              onSubmit={handleSubmit}
              noValidate
            >
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
                    accept="image/*"
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageUpload}
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
                    placeholder="URL de tu producto"
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

                {errores.descripcion && (
                  <p className={Style.error}>{errores.descripcion}</p>
                )}
              </fieldset>

              {error && <p>{error}</p>}
              <input
                className={Style.inputSubmit}
                type="submit"
                value="Crear Producto"
              />
            </form>
          </>
        )}
      </Layout>
    </div>
  );
}
