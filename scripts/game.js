// Variables
var g = 9.8;
var a = g;
var timer = null;
var dt = 0.016683;
var h = 0;
var v = 20;
var jumping = false;
var mov = 0;
var speed = 10;
var obstacleInterval = null;
var punctuation = 0;
var punctuationInterval = 100; // Timer de la puntuacion
var backgroundInterval = null;
var lifes = 3;
var lifeCount;
var lifeInterval=null;

// Main Activity
$(document).ready(function () {

    // Calcular pixel del suelo
    setElementFixedToGround("dino", 0);

    // Sacar un obstaculo al azar
    choseObstacle();

    // sacar vida.
    choseLife();

    // Saltar al pulsar una tecla
    document.onkeydown = function () { if (jumping == false) { startJump(); } };

    // Pruebas

    console.log("Pruebas say : " + $("#dino").attr("id"));

    // Pruebas
    actualizarPuntuacion();

    //Mostrar Vidas
    MostrarVidas();

});

// Funciones

// Empezar el juego
function startJump() {
    timer = setInterval(function () { jump(); }, dt);
    jumping = true;
}

// Pausar el juego
function stopJump() {
    clearInterval(timer);
    jumping = false;
}

// Calcular pixel del suelo
function setElementFixedToGround(id, mod) {
    var skyHeight = $(sky).height();
    var ground = skyHeight;
    ground -= $("#" + id).height();
    // Pasar pixeles a porcentage
    ground = (ground * 100) / $(sky).height();
    // Poner el elemento en el sitio calculado
    document.getElementById(id).style.top = (ground - mod) + "%";
}

// Saltar
function jump() {
    v -= a * dt;
    if (h >= 0) {
        h += v * dt;
    } else {
        h = 0;
        v = 20;
        stopJump();
    }
    setElementFixedToGround("dino", h);
}

// Elegir obstaculo aleatorio
function choseObstacle() {
    var randomNum = Math.random();
    // Random number generator (0-1)
    if (randomNum <= 0.33) { // Sale pajaro
        newObstacle("pajaro");
    }
    if (randomNum > 0.33 && randomNum < 0.66) { // Sale cactus
        newObstacle("cactus");
    }
    if (randomNum >= 0.66 && randomNum < 0.90) { // Salen Pinchos
        newObstacle("pinchos");
    }
    if (randomNum >= 0.90) { // Salen Pinchos
        newObstacle("lanza");
    }

}

function choseLife(){
    //timer
    newLife("vidaG");
}

function newLife(type) {

}

// Crear enemgio
function newObstacle(type) {
    var enemmy = document.createElement("div");
    enemmy.setAttribute("type", "div");
    enemmy.setAttribute("id", type);
    document.getElementById("sky").appendChild(enemmy);
    mov = $(sky).width();
    document.getElementById(type).style.left = mov + "px";
    obstacleInterval = setInterval(function () { enemmyMovement(type); }, speed);
}

// Movimiento del enemigo enemigo
function enemmyMovement(type) {
    if (document.getElementById(type) != null) {
        var ennemy = document.getElementById(type);
        var dino = document.getElementById("dino");
        mov -= 5;
        document.getElementById(type).style.left = mov + "px";
        if (overlaps(ennemy, dino)) {
            if (lifes == 0) {
                stopGame();
            } else {
                lifes--;
                deleteEnemmy(type);
                var life = document.getElementById("life" + (lifes));
                console.log(lifes)
                
                var padre=life.parentElement;
                padre.removeChild(life);
            }
        }
        if (type == "cactus" || type == "pajaro") {
            if (-50 >= mov) { deleteEnemmy(type); }
        } else {
            if (-250 >= mov) { deleteEnemmy(type); }
        }
    }
}

// Eliminar enemigo
function deleteEnemmy(type) {
    var elemento = document.getElementById(type);
    var padre = elemento.parentElement;
    padre.removeChild(elemento);
    clearInterval(obstacleInterval);
    speed *= 0.98;
    choseObstacle();
}

// Detector de colisiones (Devuelve true si colisionan)
var overlaps = (function () {

    function getPositions(elem) {
        var pos, width, height;
        pos = $(elem).position();
        width = $(elem).width();
        height = $(elem).height();
        return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
    }

    function comparePositions(p1, p2) {
        var r1 = p1[0] < p2[0] ? p1 : p2;
        var r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function (a, b) {
        var pos1 = getPositions(a);
        var pos2 = getPositions(b);
        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    };

})();

// Puntuación 
function actualizarPuntuacion() {
    backgroundInterval = setInterval(function () {
        document.getElementById("punt").innerHTML = punctuation++;
        if (punctuation % 200 == 0) {
            if (punctuation % 400 == 0) {
                $("#sky").css("background-color", "aqua");
                $("#dino").css("background-color", "black");
            }
            else {
                $("#sky").css("background-color", "black");
                $("#dino").css("background-color", "white");
            }
        }
    }, punctuationInterval, "JavaScript");
}

function stopGame() {
    console.log("enemmyMovement() say : Has perdido.");
    clearInterval(backgroundInterval);
    jumping = true;
    clearInterval(obstacleInterval);
    clearInterval(timer);
}


//Christian


function MostrarVidas() {
    for(lifeCount=0;lifeCount < lifes; lifeCount++) {
        var vida = document.createElement("div");
        vida.setAttribute("type", "div");
        vida.setAttribute("id", "life" + lifeCount);
        vida.setAttribute("class", "life");
        $(vida).css("left" , lifeCount * 56 + "px");
        document.getElementById("vidas").appendChild(vida);
    }
}

// Christian Cosas que no pero si 
/*

function pajaroMovement() {
    if (document.getElementById("pajaro") != null) {
        mov = mov - 5;
        document.getElementById("pajaro").style.left = mov + "px";
        //velocidad
        //document.getElementById("pajaro").style.left = x + "%";
        //yield sleep(200);
        //sleep(200);
        //setTimeout(200);
        eliminarEnemigoPajaro();
    }
}

function cactusMovement() {
    if (document.getElementById("cactus") != null) {
        mov = mov - 5;
        document.getElementById("cactus").style.left = mov + "px";
        eliminarEnemigoCactus();
        //var element = document.getElementById('cactus'),
        //style = window.getComputedStyle(element),
        //left = style.getPropertyValue('left');
        //console.log(left);
    }
}

//Elegir obstaculo
function choseObstacle() {
    //random number generator (0-1)
    var enemigo = Math.random();
    console.log(enemigo);
    if (enemigo <= 0.5) {
        crearEnemigosPajaro();
    } else {
        crearEnemigosCactus();
    }
    //Esperar x tiempo con un random number generator
}

function eliminarEnemigoPajaro() {
    var elemento = document.getElementById("pajaro");
    var padre = elemento.parentElement;
    var style = window.getComputedStyle(elemento),
    left = style.getPropertyValue("left");
    if (left == (0 + "px")) {
        //console.log("entrado");
        padre.removeChild(elemento);
        speed -= 0.01;
        clearInterval(obstacleInterval);
        choseObstacle();
    }
}

function eliminarEnemigoCactus() {
    var elemento = document.getElementById("cactus");
    var padre = elemento.parentElement;
    style = window.getComputedStyle(elemento);
    left = style.getPropertyValue("left");
    if (left == (0 + "px")) {
        //console.log(left);
        padre.removeChild(elemento);
        speed -= 0.5;
        clearInterval(obstacleInterval);
        choseObstacle();
    }
}

function crearEnemigosPajaro() {
    var z = document.createElement("div");
    z.setAttribute("type", "div");
    z.setAttribute("class", "pajaro");
    z.setAttribute("id", "pajaro");
    document.getElementById("sky").appendChild(z);
    // console.log("crearEnemigosPajaro() say: Creado");
    mov = $(sky).width();
    document.getElementById("pajaro").style.left = mov + "px";
    // console.log(mov);
    obstacleInterval = setInterval(pajaroMovement, speed);
}

function crearEnemigosCactus() {
    var z = document.createElement("div");
    z.setAttribute("type", "div");
    z.setAttribute("class", "cactus");
    z.setAttribute("id", "cactus");
    document.getElementById("sky").appendChild(z);
    // console.log("crearEnemigosPajaro() say: Creado");
    mov = $(sky).width();
    document.getElementById("cactus").style.left = mov + "px";
    // console.log("crearEnemigosPajaro() say: Colocado en: " + mov);
    obstacleInterval = setInterval(cactusMovement, speed);
}

*/
// ------------------------------ 