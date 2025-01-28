//Variables
let numeroSecreto = 0;
let listaNumerosSorteados = [];
let limiteIntentos;
let máximoValor;
let numeroJuegos;
let contador = 0;
let intentos=1;
let i =1;
let numeroDeUsuario;


//Juego Cargado
juegoInicializado();

function juegoInicializado(){
    //Botones de juego Desactivados
    desactivarBotones('Intentar');
    desactivarBotones('reiniciar');
    desactivarBotones('valorUsuario');

    //Elementos
    asignarTextoElemento('h1','EL NÚMERO SECRETO');
    asignarTextoElemento('p','Click para comenzar');

    return;
}



//Límite del Número Secreto
function numeroLimite(){
    //Botones
    activarBotones('valorUsuario');
    activarBotones('Guardar');
    desactivarBotones('iniciarJuego');
    //Elementos
    asignarTextoElemento('p','Escriba el número máximo para el número secreto');
}
//Definir número máximo
function definirNumeroLimite(){
    máximoValor = parseInt(document.getElementById('valorUsuario').value);
    if(isNaN(máximoValor) || máximoValor <= 0){
        asignarTextoElemento('p','Ingrese un valor correcto')

    }else{
        asignarTextoElemento('p','Click a siguiente para continuar o escriba otra opción');
        cantidadJuegos(máximoValor);
        activarBotones('siguiente');
    }

    return;
}



//Cantidad de intentos

function intentosPosibles(){
    //Limpiar Caja
    limpiarCaja();
    //Botones
    desactivarBotones('Guardar');
    activarBotones('guardar2');
    desactivarBotones('siguiente');
    //Elementos
    asignarTextoElemento('p','Escriba la cantidad de Intentos');

}

//Definir los intentos
function definirIntento(){
    limiteIntentos = parseInt(document.getElementById('valorUsuario').value);
    if(isNaN(limiteIntentos) || limiteIntentos <= 0){
        asignarTextoElemento('p','Ingrese un valor correcto');

    }else{
        asignarTextoElemento('p','Escriba otra opción o click en Iniciar');
        activarBotones('comenzar');
    }
    return;
}



//Cuando inicie el Juego
function iniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //Desactivar botones generales
    desactivarBotones('guardar2');
    desactivarBotones('comenzar');
    
    //Activar botones de juego
    activarBotones('Intentar');
    activarBotones('reiniciar');

    //Inicio del juego
    condicionesIniciales();
}



//Elementos de Inicio y Reinicio
function condicionesIniciales(){
    i = 1;
    intentos=1;
    contador++

    if(contador>numeroJuegos){
        asignarTextoElemento('h1','EL NÚMERO SECRETO SE RETIRO DE LA PARTIDA')
        asignarTextoElemento('p',`Felicidades, has jugado ${numeroJuegos} ${(numeroJuegos===1) ? ' vez' :' veces'}`)
        desactivarBotones('valorUsuario');
        desactivarBotones('Intentar');
        desactivarBotones('reiniciar');

    }else{
        asignarTextoElemento('h1','Juego del número secreto');
        asignarTextoElemento('p',`Indica un número del 1 al ${máximoValor}`);
        numeroSecreto = generarNumeroSecreto();
        console.log(numeroSecreto);
    }

}




//CAMBIOS EN LOS ELEMENTOS
//Contenido del Título y Párrafo
function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Activar y desactivar Botones
function activarBotones(idActivarBoton){
    document.getElementById(idActivarBoton).style.display = "block";

}
function desactivarBotones(idDesactivarBoton){
    document.getElementById(idDesactivarBoton).style.display = "none";
}




//Verifica si el número ingresado por el usuario es igual al número secreto.
function cantidadIntentos(){
    if(i<limiteIntentos){     
        verificarIntento();
            
    }else if(i>=limiteIntentos){
        verificarIntento();
        //Botones
        document.querySelector('#Intentar').setAttribute('disabled',true);
        document.getElementById('reiniciar').removeAttribute('disabled');
        //Elementos
        asignarTextoElemento('h1','No encontrastes al Número Secreto')
        asignarTextoElemento('p',`El número secreto es: ${numeroSecreto}`);
    }

    return;
}

function nuevoIntento(){
    numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if(isNaN(numeroDeUsuario) || numeroDeUsuario <= 0){
        limpiarCaja();
        asignarTextoElemento('p','Ingrese un valor correcto');
    }else{
        cantidadIntentos();
    }

    
    return;   
}

function verificarIntento(){
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertastes el número en ${intentos}${(intentos===1) ? ' vez' :' veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
            if(numeroDeUsuario>numeroSecreto){
                asignarTextoElemento('p','El número secreto es menor.');
            }else {
                asignarTextoElemento('p','El número secreto es mayor.');
            }
            intentos++;
            limpiarCaja();
        }

        i++;
}



//Genera el número secreto
function generarNumeroSecreto(){
    let numeroGenerado=Math.floor(Math.random()*máximoValor+1);
    if(listaNumerosSorteados.includes(numeroGenerado)){
        return generarNumeroSecreto();
    }else{
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}


//Limpia el input
function limpiarCaja(){
    document.querySelector('#valorUsuario').value='';
}


//Cantidad de Juegos Generales
function cantidadJuegos(maximoUsuario){
    let nuevoNúmero = parseInt(maximoUsuario);

    numeroJuegos = Math.floor(nuevoNúmero/3);
    return numeroJuegos;
}

//reinicia el juego
function reiniciarJuego(){
    //limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalos de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled',true);
    document.getElementById('Intentar').removeAttribute('disabled');
}


