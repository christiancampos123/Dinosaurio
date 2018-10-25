// Variables
var g = 9.8;
var a = g;
var timer = null;
var dt = 0.016683;
var h = 0;
var v = 20;
var limit = 0;
var windowHeight = 0;
var started = false;
var mov = 1920;
var movC = 1920;
var speed = 0;
var recorrido = 0.2;

// Main Activity

$(document).ready(function () {

    calculateLimit();
    setDinoPosition();
    //crearEnemigosCactus();
    //crearEnemigosPajaro();
    elegirObstaculo();

    // Saltar al pulsar una tecla
    document.onkeydown = function () { if (started == false) { start(); } };


});

// Funciones

// Empezar el juego
function start() {
    timer = setInterval(function () { move(); }, dt);
    started = true;
}

// Pausar el juego
function stop() {
    clearInterval(timer);
}

// Calcular el punto de aterrizaje
function calculateLimit() {
    windowHeight = $(sky).height();
    limit = windowHeight;
    limit -= $("#dino").height();
    limit = (limit * 100) / $(sky).height();
}

// Poner en su sitio al Dinosaurio
function setDinoPosition() {
    document.getElementById("dino").style.top = limit + "%";
}

// Saltar
function move() {
    // Cambiar velocidad
    v -= a * dt;
    if (h >= 0) { h += v * dt; } else { h = 0; v = 20; started = false; stop(); }

    document.getElementById("dino").style.top = limit - h + "%";
}

//christian



function pajaroMovement() {
    if (document.getElementById("pajaro") != null) {
        mov = mov - 5;
        document.getElementById("pajaro").style.left = mov + "px";
        //velocidad
        //document.getElementById("pajaro").style.left = x + "%";
        //yield sleep(200);
        //sleep(200);
        //setTimeout(200);

        var element = document.getElementById('pajaro'),
            style = window.getComputedStyle(element),
            left = style.getPropertyValue('left');
        //console.log(left);

        eliminarEnemigoPajaro();

    }
}

function cactusMovement() {
    if (document.getElementById("cactus") != null) {
        movC = movC - 5;
        document.getElementById("cactus").style.left = movC + "px";
        //velocidad
        //document.getElementById("pajaro").style.left = x + "%";
        //yield sleep(200);
        //sleep(200);
        //setTimeout(200);

        var element = document.getElementById('cactus'),
            style = window.getComputedStyle(element),
            left = style.getPropertyValue('left');
        //console.log(left);

        eliminarEnemigoCactus();
    }
}

//Elegir obstaculo

function elegirObstaculo() {
    //random number generator (0-1)
    var enemigo = Math.random();
    console.log(enemigo);
    if (enemigo <= 0.5) {
        crearEnemigosPajaro();
    } else {
        crearEnemigosCactus();
    }
    //esperar x tiempo con un random number generator
}

function eliminarEnemigoPajaro() {

    var elemento = document.getElementById("pajaro");
    var padre = elemento.parentElement;
    var element = document.getElementById('pajaro'),
        style = window.getComputedStyle(element),
        left = style.getPropertyValue('left');
    //console.log(left);

    if (left == (0 + "px")) {
        console.log("entrado");
        padre.removeChild(elemento);
        //crearEnemigosPajaro();
        //resetPosicion();
        elegirObstaculo();
        recorrido = recorrido + 0.21;
    }
}

function eliminarEnemigoCactus() {

    var elemento = document.getElementById("cactus");
    var padre = elemento.parentElement;
    var element = document.getElementById('cactus'),
        style = window.getComputedStyle(element),
        left = style.getPropertyValue('left');
    //console.log(left);
    var dec = 0;

    if (left == (dec + "px")) {
        console.log(left);
        padre.removeChild(elemento);
        //crearEnemigosCactus();
        //resetPosicion();
        elegirObstaculo();
        recorrido = recorrido + 0.21;
    }

}


function crearEnemigosPajaro() {
    var z = document.createElement("div");
    z.setAttribute("type", "div");
    z.setAttribute("class", "pajaro");
    z.setAttribute("id", "pajaro");
    document.getElementById("sky").appendChild(z);
    //console.log("creado");
    mov = 1920;
    document.getElementById("pajaro").style.left = mov + "px";
    //console.log(mov);
}

function crearEnemigosCactus() {
    var z = document.createElement("div");
    z.setAttribute("type", "div");
    z.setAttribute("class", "cactus");
    z.setAttribute("id", "cactus");
    document.getElementById("sky").appendChild(z);
    console.log("creado");
    movC = 1920;
    document.getElementById("cactus").style.left = movC + "px";
    console.log(movC);
}


interval = setInterval(pajaroMovement, 10);
interval = setInterval(cactusMovement, 10);