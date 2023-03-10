import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";



export default function useAutenticacion(){
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null)


    useEffect(() => { 
        const auth = getAuth();
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user){
                guardarUsuarioAutenticado(user)
            }else{
                guardarUsuarioAutenticado(null)
            }
        })

        return unsuscribe
    },[])

    return usuarioAutenticado
}


