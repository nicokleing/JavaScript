let numeros = [8, 4, 2, 9, 5, 7, 85, 1, 3, 4, 5 , 7 , 789];

// ejercicio 1 BubbleSort:

function ordenarElementos(array) {
    for (let j = 0; j < array.length; j++) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                let temporal = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temporal;
            }
        }
    }
    return array;
}

let nuevoArray = ordenarElementos(numeros);

//console.log(nuevoArray);

// Ejercicio 2

function indicarSiEstaOrdenado(array){
    let ordenado = true;
   
        for(let j = 0; j < array.length; j++) {
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {

                    ordenado = false;
                }
            }
      }

    return ordenado
}

//ordenarElementos(numeros);
//let retorno = indicarSiEstaOrdenado(numeros);
//console.log(retorno);

// Ejercicio 3

function contarCoincidencias(array, mun){
 
    let cantidad = 0;
    for(let i = 0 ; i < array.length ; i++){
        if(array[i] == mun){
            cantidad++;
    }
    return cantidad;
}

}

//let cant = contarCoincidencias(numeros, 4);
//console.log("Cantidad de coincidencias :" + cant);

// Ejercicio 4 


let temas = [
    {
        nombre : "Arrasando",
        cantidadDeVotos : 230
    },

    {
        nombre : "bailando",
        cantidadDeVotos : 120
    },
    {
        nombre : "rico rico",
        cantidadDeVotos : 456
    },
    {
        nombre : "mentia",
        cantidadDeVotos : 456
    },
    {
        nombre : "amor amor",
        cantidadDeVotos : 456
    }

];

// Busquueda lineal

function busquedaLineal(array, tema){
    for(let i = 0 ; i < array.length ; i++){
        if(array[i].nombre === tema){
        
            return array[i].cantidadDeVotos;
        }
    }

    return "El tema buscado no se enuentra dentro del array";
}

let votos = busquedaLineal(temas, "Arrasando");
console.log(votos);

// busqueda binaria

function busquedaBinaria(array, temas){

    let inicio = 0;
    let fin = array.length - 1;

    while(inicio <= fin){
        let posMedio = Math.round((inicio + fin) / 2);
        let medio = array[posMedio];

        if(medio.nombre === temas){
            return medio.cantidadDeVotos;
        }

        if(medio.nombre > temas){
            fin = posMedio - 1;
        }else {
            inicio = posMedio + 1;
        }
    }

    return -1
    
}