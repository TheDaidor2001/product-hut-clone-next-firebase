import { Layout } from "@/components/layouts/Layout";
import Style from "../styles/Home.module.css";
import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { DetallesProducto } from "@/components/layouts/DetallesProducto";

export default function Home() {
  const [productos, guardarProductos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(firebase.db, "productos"));
      const productos = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      guardarProductos(productos)
    };

    obtenerProductos();
  }, []);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {productos.map(producto => (
                <DetallesProducto key={producto.id} producto={producto}/>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
