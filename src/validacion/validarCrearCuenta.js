export default function validarCrearCuenta(valores) {
  let errores = {};

  //validar el nombre
  if (!valores.nombre) {
    errores.nombre = "El Nombre es obligatorio";
  }

  //Validar email
  if (!valores.email) {
    errores.email = "El Email es obligatorio";
  }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no válido"
  }

  //Validar el password

  if (!valores.password) {
    errores.password = "La Contraseña es obligatoria";
  }else if(valores.password.length < 6 ) {
    errores.password = "La contraseña debe tener 6 carácteres como mínimo"
  }


  return errores;
}
