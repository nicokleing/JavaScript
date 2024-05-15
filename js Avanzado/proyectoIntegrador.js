const prompt = require("prompt-sync")({ sigint: true });

let tareas = [];
let categoriasNombres = [
  "Trabajo",
  "Personal",
  // Agregar mas categorías segun sea necesario
];

// Función que muestra todas las categorías
function mostrarTodasLasCategorias() {
  console.log("Categorías existentes: ");
  categoriasNombres.forEach(function (categoria, indice) {
    console.log(indice + ":" + categoria);
  });
}

// Función que sirve para cargar nuevas categorías por el usuario
function agregarNuevaCategoriaPorElUsuario(nombreCategoria) {
  categoriasNombres.push(nombreCategoria);
  console.log("Categoría " + nombreCategoria + " agregada correctamente");
}

// Función para agregar una tarea
function agregarTarea(nombreRecibido, fechaLimiteRecibida = null) {
  mostrarTodasLasCategorias();
  let numeroCategoria = parseInt(
    prompt("Ingrese el número de la categoría para la nueva tarea: ")
  );
  if (numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length) {
    tareas.push({
      nombre: nombreRecibido,
      completada: false,
      fechaLimite: fechaLimiteRecibida,
      categoria: numeroCategoria,
    });
    console.log("¡Tarea agregada con éxito!");
  } else {
    console.log("¡Número de categoría incorrecto!");
  }
}

// Eliminar una tarea
function eliminarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1);
    console.log("¡Tarea eliminada correctamente!");
  } else {
    console.log("Índice de tarea inválido");
  }
}

// Función para marcar tarea como completada
function completarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].completada = true;
    console.log("¡Tarea marcada como completada!");
  } else {
    console.log("Índice de tarea inválido");
  }
}

// Función para modificar una tarea específica
function modificarTarea(
  indice,
  nuevoNombre,
  nuevaFechaLimite = null,
  nuevoNumeroCategoria
) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].nombre =
      nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre;
    tareas[indice].fechaLimite =
      nuevaFechaLimite !== undefined
        ? nuevaFechaLimite
        : tareas[indice].fechaLimite;
    tareas[indice].categoria =
      nuevoNumeroCategoria !== undefined
        ? nuevoNumeroCategoria
        : tareas[indice].categoria;
    console.log("¡Modificación correcta!");
  } else {
    console.log("Índice de tarea inválido");
  }
}

// Función que filtra tareas por categoría
function filtrarTareasPorCategoria(numeroCategoria) {
  let tareasFiltradas = tareas.filter(function (tarea) {
    return tarea.categoria === numeroCategoria;
  });
  return tareasFiltradas;
}

// Función que muestra la cantidad de tareas completadas por categoría
function contarTareasCompletadasPorCategoria(numeroCategoria) {
  let tareasCategoria = filtrarTareasPorCategoria(numeroCategoria);
  let tareasCompletadas = tareasCategoria.reduce(function (contador, tarea) {
    return tarea.completada ? contador + 1 : contador;
  }, 0);
  let tareasEnTotal = tareasCategoria.length;
  console.log(
    "Tareas completadas de la categoría " +
      categoriasNombres[numeroCategoria] +
      ": " +
      tareasCompletadas +
      " de " +
      tareasEnTotal +
      " tareas!"
  );
}

// Función que muestra todas las tareas no completadas
function mostrarTareasNoCompletadas() {
  console.log("Tareas no completadas: ");
  tareas.forEach(function (tarea) {
    if (!tarea.completada) {
      console.log(
        "- Nombre: " +
          tarea.nombre +
          " Categoría: " +
          categoriasNombres[tarea.categoria]
      );
    }
  });
}

// Función para ordenar tareas por la propiedad nombre utilizando BubbleSort
function ordenarTareasPorNombre() {
  let total = tareas.length;

  for (let j = 0; j < total; j++) {
    for (let i = 0; i < total - 1; i++) {
      if (tareas[i].nombre > tareas[i + 1].nombre) {
        let temp = tareas[i];
        tareas[i] = tareas[i + 1];
        tareas[i + 1] = temp;
      }
    }
  }
}

// Función para ordenar tareas por la propiedad fecha límite utilizando BubbleSort
function ordenarTareasPorFechaLimite() {
  let total = tareas.length;

  for (let j = 0; j < total; j++) {
    for (let i = 0; i < total - 1; i++) {
      if (tareas[i].fechaLimite > tareas[i + 1].fechaLimite) {
        let temp = tareas[i];
        tareas[i] = tareas[i + 1];
        tareas[i + 1] = temp;
      }
    }
  }
}

// Función que busca una tarea por nombre y retorna su posición
function buscarTareaPorNombre(nombreTarea) {
  let inicio = 0;
  let fin = tareas.length - 1;

  while (inicio <= fin) {
    let posElementoMedio = Math.floor((inicio + fin) / 2);

    if (tareas[posElementoMedio].nombre === nombreTarea) {
      return posElementoMedio;
    } else if (tareas[posElementoMedio].nombre < nombreTarea) {
      inicio = posElementoMedio + 1;
    } else {
      fin = posElementoMedio - 1;
    }
  }
  return -1;
}

// Función para mostrar el menú de opciones
function mostrarMenu() {
  console.log(" --- Menú ---");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar tarea");
  console.log("3. Marcar tarea como completada");
  console.log("4. Modificar una tarea");
  console.log("5. Mostrar todas las tareas");
  console.log("6. Ver todas las categorías");
  console.log("7. Agregar nueva categoría");
  console.log("8. Filtrar tareas por categoría");
  console.log("9. Visualizar cantidad de tareas completadas");
  console.log("10. Visualizar todas las tareas no completadas");
  console.log("11. Ordenar las tareas alfabéticamente");
  console.log("12. Ordenar las tareas por fecha límite");
  console.log("13. Buscar una tarea por su nombre");
  console.log("0. Salir");
}

// Función para interactuar con el usuario
function interactuarConUsuario() {
  let opcion = -1;
  while (opcion !== 0) {
    mostrarMenu();
    opcion = parseInt(prompt("Ingrese la opción seleccionada:"));
    switch (opcion) {
      case 1:
        let nombreTareaNueva = prompt(
          "Ingrese el nombre de la tarea a cargar: "
        );
        agregarTarea(nombreTareaNueva);
        break;
      case 2:
        let indiceAEliminar = parseInt(
          prompt("Ingrese el índice de la tarea a eliminar: ")
        );
        eliminarTarea(indiceAEliminar);
        break;
      case 3:
        let indiceACompletar = parseInt(
          prompt("Ingrese el índice de la tarea a completar: ")
        );
        completarTarea(indiceACompletar);
        break;
      case 4:
        let indice = parseInt(prompt("Ingrese el índice a modificar: "));
        if (indice >= 0 && indice < tareas.length) {
          let opcionMod = parseInt(
            prompt(
              "¿Qué propiedad desea modificar? 1. Nombre, 2. Fecha límite, 3. Número de categoría"
            )
          );
          switch (opcionMod) {
            case 1:
              let nuevoNombre = prompt("Ingrese el nuevo nombre de su tarea: ");
              modificarTarea(indice, nuevoNombre);
              break;
            case 2:
              let nuevaFechaLimite = prompt(
                "Ingrese la nueva fecha límite para su tarea: "
              );
              modificarTarea(indice, undefined, nuevaFechaLimite);
              break;
            case 3:
              let nuevoNumDeCategoria = parseInt(
                prompt("Ingrese un nuevo número de categoría")
              );
              if (
                nuevoNumDeCategoria >= 0 &&
                nuevoNumDeCategoria < categoriasNombres.length
              ) {
                modificarTarea(
                  indice,
                  undefined,
                  undefined,
                  nuevoNumDeCategoria
                );
              } else {
                console.log("Número de categoría incorrecto!");
              }
              break;
            default:
              console.log("¡Opción inválida!");
          }
        } else {
          console.log("Índice de tarea incorrecto!");
        }
        break;
      case 5:
        console.log(" -- LISTA DE TAREAS --");
        console.log(tareas);
        break;
      case 6:
        mostrarTodasLasCategorias();
        break;
      case 7:
        let nuevaCategoria = prompt(
          "Ingrese el nombre de la nueva categoría a agregar: "
        );
        agregarNuevaCategoriaPorElUsuario(nuevaCategoria);
        break;
      case 8:
        mostrarTodasLasCategorias();
        let nroCategoria = parseInt(
          prompt("Ingrese el número de la categoría a filtrar: ")
        );
        let tareasCategoria = filtrarTareasPorCategoria(nroCategoria);
        console.log("Tareas de la categoría seleccionada: ");
        console.log(tareasCategoria);
        break;
      case 9:
        mostrarTodasLasCategorias();
        let nroCateg = parseInt(
          prompt("Ingrese el número de la categoría a visualizar: ")
        );
        contarTareasCompletadasPorCategoria(nroCateg);
        break;

      case 10:
        mostrarTareasNoCompletadas();
        break;

      case 11:
        ordenarTareasPorNombre();
        console.log("Tareas ordenadas alfabéticamente: ");
        console.log(tareas);
        break;

      case 12:
        ordenarTareasPorFechaLimite();
        console.log("Tareas ordenadas por fecha límite: ");
        console.log(tareas);
        break;

      case 13:
        ordenarTareasPorNombre();
        let nombreABuscar = prompt("Ingrese nombre de la tarea a buscar: ");
        let indiceTarea = buscarTareaPorNombre(nombreABuscar);

        if (indiceTarea !== -1) {
          console.log("Tarea encontrada en el índice: " + indiceTarea);
        } else {
          console.log("Tarea no encontrada");
        }
        break;

      default:
        console.log("¡Opción inválida!");
        break;
    }
  }
}

interactuarConUsuario();
