import { Layout } from "@/components/layouts/Layout";
import Style from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Layout>
        <h1 className={Style.texto}>Inicio</h1>
      </Layout>
    </div>
  );
}
