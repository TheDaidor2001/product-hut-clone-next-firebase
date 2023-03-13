export default function validarCrearProducto(valores) {
    let errores = {};
  
    //validar el nombre
    if (!valores.nombre) {
      errores.nombre = "El Nombre es obligatorio";
    }

    //validar valores
    if(!valores.empresa){
        errores.empresa = "La empresa es obligatoria"
    }

    //validar la url
    if(!valores.url){
        errores.url = "La url es obligatoria"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "La url no es válida"
    }

    //validar descripcion
    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripción"
    }

  
  
    return errores;
  }
  