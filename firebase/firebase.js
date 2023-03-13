import app from "firebase/compat/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from "./config";
import { initializeApp } from "firebase/app";
import { getStorage } from '@firebase/storage';

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig)
    this.auth = getAuth()
    this.db = getFirestore(app)
    this.storage = getStorage(this.app);
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
