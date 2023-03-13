import app from "firebase/compat/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = getAuth();
  }

  //registrar usuario

  async registrar(nombre, email, password) {
    const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password)

    return await updateProfile(nuevoUsuario.user, {
        displayName: nombre
    })
  }

  //inicio de sesion

  async login(email,password) {
    return await signInWithEmailAndPassword(this.auth,email, password)
  }


  //cerrar sesion
  async cerrarSesion(){
    const auth = getAuth();
    await signOut(auth)
  }
}

const firebase = new Firebase();
export default firebase;
